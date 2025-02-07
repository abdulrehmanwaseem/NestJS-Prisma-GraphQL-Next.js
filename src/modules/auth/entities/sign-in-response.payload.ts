import { ObjectType, Field } from '@nestjs/graphql';
import { AuthPayload } from './auth-payload';

@ObjectType()
export class SignInResponse extends AuthPayload {
  @Field({ nullable: true })
  requires2FA?: boolean;
}
