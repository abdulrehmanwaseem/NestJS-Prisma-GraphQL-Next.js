import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.entity';
import { Tag } from './tag.entity';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => User)
  user: User;

  @Field(() => [Tag])
  tags: Tag[];
}
