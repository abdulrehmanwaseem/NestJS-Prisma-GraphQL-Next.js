import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Post } from './post.entity';

@ObjectType()
export class Tag {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [Post])
  posts: Post[];
}
