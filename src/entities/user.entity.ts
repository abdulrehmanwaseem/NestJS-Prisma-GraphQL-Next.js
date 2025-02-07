import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Profile } from './profile.entity';
import { Post } from './post.entity';
import { Role } from '@common/enums';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => Role)
  role: Role;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;

  @Field(() => [Post])
  posts: Post[];

  @Field()
  isTwoFAEnabled: boolean;
}
