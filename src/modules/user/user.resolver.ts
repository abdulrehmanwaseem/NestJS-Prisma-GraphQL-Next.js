import { CurrentUser } from '@common/decorators/current-user.decorator';
import { AuthGuard } from '@common/guards/auth.guard';
import { clearAuthCookie } from '@common/utils/auth-cookie.util';
import { Logger, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Post } from 'src/entities/post.entity';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { JwtUser } from '../auth/types/jwt-user';
import { UpdateUserInput } from './dto/update-user.input';
import { UserService } from './user.service';
import { Response } from 'express';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@common/enums';
import { RolesGuard } from '@common/guards/roles.guard';

@UseGuards(AuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(UserResolver.name);

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  @Query(() => [User])
  getUsers() {
    return this.userService.findAll();
  }

  @Query(() => User)
  getUser(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @ResolveField(() => [Post])
  async posts(@Parent() user: User) {
    this.logger.debug(`Fetching posts for user ${user.id}`);
    return await this.prisma.post.findMany({
      where: { userId: user.id },
    });
  }

  @ResolveField(() => Profile, { nullable: true })
  async profile(@Parent() user: User) {
    this.logger.debug(`Fetching profile for user ${user.id}`);
    return await this.prisma.profile.findUnique({
      where: { userId: user.id },
    });
  }

  @Mutation(() => User)
  updateUser(
    @CurrentUser() user: JwtUser,
    @Args('updateUserInput')
    updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(user.userId, updateUserInput);
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @CurrentUser() user: JwtUser,
    @Context('res') res: Response,
  ) {
    const deleted = await this.userService.delete(user.userId);

    clearAuthCookie(res, this.configService);

    return deleted;
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Mutation(() => Boolean)
  async deleteUserByAdmin(
    @Args('id') id: string,
    @CurrentUser() adminUser: JwtUser,
  ) {
    this.logger.warn(`Admin ${adminUser.userId} is deleting user ${id}`);

    const deleted = await this.userService.delete(id);

    return deleted;
  }
}
