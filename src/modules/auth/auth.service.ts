import { PrismaService } from '@common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../user/dto/create-user.input';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async registerUser(input: CreateUserInput) {
    throw new Error('Method not implemented yet!');
  }
}
