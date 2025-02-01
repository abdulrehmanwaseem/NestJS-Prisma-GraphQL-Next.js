import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Profile } from './profile.entity';
import { Post } from './post.entity';
import { Role } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Role)
  role: Role;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;

  @Field(() => [Post])
  posts: Post[];
}

registerEnumType(Role, {
  name: 'Role',
});
