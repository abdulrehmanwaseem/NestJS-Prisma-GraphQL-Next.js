import { ObjectType, Field } from '@nestjs/graphql';
import { AuthPayload } from './auth-payload';

@ObjectType()
export class SignInResponse extends AuthPayload {
  @Field({ nullable: true, defaultValue: false })
  requires2FA?: boolean;
}
