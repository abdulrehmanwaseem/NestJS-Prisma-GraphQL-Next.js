import { PrismaService } from '@common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../user/dto/create-user.input';
import { hash } from 'argon2';
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
    return this.prisma.user.create({
      data: {
        ...input,
        password: hashedPassword,
        role: Role.USER,
      },
    });
  }

  async validateLocalUser({ email, password }: SignInInput) {
    const user = this.userService.findUserByEmail(email);

    return { email: '', password: '' };
  }
}
