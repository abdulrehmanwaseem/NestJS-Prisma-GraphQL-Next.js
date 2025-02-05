import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { CreateUserInput } from '../user/dto/create-user.input';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  signUp(@Args('input') input: CreateUserInput) {
    return this.authService.registerUser(input);
  }
}
