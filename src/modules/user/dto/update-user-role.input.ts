import { Field, InputType } from '@nestjs/graphql';
import { Role } from '@common/enums';

@InputType()
export class UpdateUserRoleInput {
  @Field(() => Role)
  role: Role;
}
