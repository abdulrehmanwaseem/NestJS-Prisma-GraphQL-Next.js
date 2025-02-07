import { Logger, UnauthorizedException, UseGuards } from '@nestjs/common';
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
import { UpdateUserInput } from './dto/update-user.input';
import { UserService } from './user.service';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { JwtUser } from '../auth/types/jwt-user';
import { AuthGuard } from '@common/guards/auth.guard';
import { ConfigService } from '@nestjs/config';

@UseGuards(AuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(UserResolver.name);

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

    return deleted && true;
  }
}
