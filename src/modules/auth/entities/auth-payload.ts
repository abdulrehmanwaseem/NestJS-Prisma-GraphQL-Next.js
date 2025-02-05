import { Role } from '@common/enums';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthPayload {
  @Field()
  userId: string;

  @Field(() => Role)
  role: Role;
}
