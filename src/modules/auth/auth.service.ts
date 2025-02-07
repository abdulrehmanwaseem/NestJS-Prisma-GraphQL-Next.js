import { PrismaService } from '@common/prisma/prisma.service';
import { setAuthCookie } from '@common/utils/auth-cookie.util';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { Response } from 'express';
import { CreateUserInput } from '../user/dto/create-user.input';
import { UserService } from '../user/user.service';
import { SignInInput } from './dto/signIn.input';
import { AuthPayload } from './entities/auth-payload';
import { AuthJwtPayload } from './types/auth-jwt-payload';
import { JwtUser } from './types/jwt-user';

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
    return await this.prisma.user.create({
      data: {
        ...input,
        password: hashedPassword,
        role: Role.USER,
      },
    });
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
}
