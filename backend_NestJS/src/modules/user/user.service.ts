import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UpdateUserInput } from './dto/update-user.input';
import { UpdateUserRoleInput } from './dto/update-user-role.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  async updateRole(id: string, updateUserInput: UpdateUserRoleInput) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  async delete(id: string) {
    const result = await this.prisma.user.delete({
      where: { id },
    });
    return result && true;
  }
}
