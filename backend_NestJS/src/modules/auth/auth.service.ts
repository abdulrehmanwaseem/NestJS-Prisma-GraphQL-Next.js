import { PrismaService } from '@common/prisma/prisma.service';
import { setAuthCookie } from '@common/utils/auth-cookie.util';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { Response } from 'express';
import * as qrcode from 'qrcode';
import * as speakeasy from 'speakeasy';
import { CreateUserInput } from '../user/dto/create-user.input';
import { UserService } from '../user/user.service';
import { SignInInput } from './dto/signIn.input';
import { AuthPayload } from './entities/auth-payload';
import { AuthJwtPayload } from './types/auth-jwt-payload';
import { JwtUser } from './types/jwt-user';
import { SignInResponse } from './entities/sign-in-response.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(input: CreateUserInput): Promise<User> {
    const hashedPassword = await hash(input.password);

    // Finding for giving role admin to first user, it is well optimize upto millions users:
    const firstUser = await this.prisma.user.findFirst({
      select: { id: true },
    });

    const role = firstUser ? Role.USER : Role.ADMIN; // First user = Admin

    return await this.prisma.user.create({
      data: {
        ...input,
        password: hashedPassword,
        role,
      },
    });
  }

  async signIn(input: SignInInput, res: Response): Promise<SignInResponse> {
    const user = await this.validateLocalUser(input);

    if (user.isTwoFAEnabled) {
      return { userId: user.id, requires2FA: true }; // Ask for OTP
    }

    return this.login(user, res);
  }

  async validateLocalUser({ email, password }: SignInInput): Promise<User> {
    const user = await this.userService.findUserByEmail(email);

    const passwordMatched = await verify(user.password, password);
    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    return user;
  }

  async generateToken(userId: string) {
    const payload: AuthJwtPayload = {
      sub: {
        userId,
      },
    };
    const jwtToken = await this.jwtService.signAsync(payload);
    return { jwtToken };
  }

  async login(user: User, res: Response): Promise<AuthPayload> {
    const { jwtToken } = await this.generateToken(user.id);

    setAuthCookie(res, jwtToken, this.configService);

    return { userId: user.id, role: user.role };
  }

  async validateJwtUser(userId: string) {
    const { id, role } = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const jwtUser: JwtUser = {
      userId: id,
      role,
    };

    return jwtUser;
  }

  async generate2FA(userId: string): Promise<string> {
    const secret = speakeasy.generateSecret({
      name: `NestJS-Prisma-GraphQL (${userId})`,
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isTwoFAEnabled: true,
        twoFASecret: secret.base32,
      },
    });

    return qrcode.toDataURL(secret.otpauth_url);
  }

  async disable2FAOption(userId: string): Promise<boolean> {
    const result = await this.prisma.user.update({
      where: { id: userId },
      data: {
        isTwoFAEnabled: false,
        twoFASecret: null,
      },
    });

    return result ? true : false;
  }

  async validate2FA(userId: string, token: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { twoFASecret: true },
    });

    if (!user.twoFASecret) {
      throw new UnauthorizedException('2FA is not enabled.');
    }

    return speakeasy.totp.verify({
      secret: user.twoFASecret,
      encoding: 'base32',
      token,
    });
  }

  async verifyAndLoginWith2FA(
    userId: string,
    token: string,
    res: Response,
  ): Promise<AuthPayload> {
    const isValid = await this.validate2FA(userId, token);
    if (!isValid) {
      throw new UnauthorizedException('Invalid OTP Provided.');
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    return this.login(user, res);
  }
}
