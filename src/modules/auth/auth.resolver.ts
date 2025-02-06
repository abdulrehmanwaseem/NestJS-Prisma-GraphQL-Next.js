import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { CreateUserInput } from '../user/dto/create-user.input';
import { AuthService } from './auth.service';
import { AuthPayload } from './entities/auth-payload';
import { SignInInput } from './dto/signIn.input';
import { Request, Response } from 'express';

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
    @Context('req') req: Request,
  ) {
    const user = await this.authService.validateLocalUser(input);
    return await this.authService.login(user, res);
  }
}
