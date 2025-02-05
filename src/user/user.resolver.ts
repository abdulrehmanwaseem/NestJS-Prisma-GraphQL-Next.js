import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Post } from 'src/entities/post.entity';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Profile } from 'src/entities/profile.entity';
import { Logger } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  private readonly logger = new Logger(UserResolver.name);

  @Query(() => [User])
  getUsers() {
    return this.userService.findAll();
  }

  @Query(() => User)
  getUser(@Args('id', { type: () => String }) id: string) {
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
    return (
      (await this.prisma.profile.findUnique({
        where: { userId: user.id },
      })) || {
        id: 1,
        bio: 'I am biology',
        avatar: 'https://robohash.org/22e77114bdc4a671ec81a2d498114b5d',
      }
    );
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.delete(id);
  }
}
