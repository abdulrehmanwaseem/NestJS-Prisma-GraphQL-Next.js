import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { CreateUserInput } from '../user/dto/create-user.input';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signIn.input';
import { AuthPayload } from './entities/auth-payload';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async signUp(
    @Args('input') input: CreateUserInput,
    @Context('res') res: Response,
  ) {
    const user = await this.authService.registerUser(input);
    return await this.authService.login(user, res);
  }

  @Mutation(() => AuthPayload)
  async signIn(
    @Args('input') input: SignInInput,
    @Context('res') res: Response,
  ) {
    const user = await this.authService.validateLocalUser(input);
    return await this.authService.login(user, res);
  }
}
