import { PrismaService } from '@common/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from '../user/dto/create-user.input';
import { hash, verify } from 'argon2';
import { Role, User } from '@prisma/client';
import { SignInInput } from './dto/signIn.input';
import { UserService } from '../user/user.service';
import { AuthJwtPayload } from './types/auth-jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './entities/auth-payload';
import { Response } from 'express';
import { setAuthCookie } from '@common/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(input: CreateUserInput) {
    const hashedPassword = await hash(input.password);
    return await this.prisma.user.create({
      data: {
        ...input,
        password: hashedPassword,
        role: Role.USER,
      },
    });
  }

  async validateLocalUser({ email, password }: SignInInput) {
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

    setAuthCookie(res, jwtToken, this.configService.get<string>('NODE_ENV'));

    return { userId: user.id, role: user.role };
  }
}
