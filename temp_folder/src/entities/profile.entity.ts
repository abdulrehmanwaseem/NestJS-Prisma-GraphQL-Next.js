import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: number;

  @Field()
  bio: string;

  @Field()
  avatar: string;

  @Field(() => User)
  user: User;
}
