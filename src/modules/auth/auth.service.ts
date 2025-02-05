import { PrismaService } from '@common/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from '../user/dto/create-user.input';
import { hash, verify } from 'argon2';
import { Role } from '@prisma/client';
import { SignInInput } from './dto/signIn.input';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
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
}
