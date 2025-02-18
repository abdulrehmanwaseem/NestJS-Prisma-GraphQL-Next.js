import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { CreateUserInput } from '../user/dto/create-user.input';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signIn.input';
import { AuthPayload } from './entities/auth-payload';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { JwtUser } from './types/jwt-user';
import { AuthGuard } from '@common/guards/auth.guard';
import { UserService } from '../user/user.service';
import { clearAuthCookie } from '@common/utils/auth-cookie.util';
import { ConfigService } from '@nestjs/config';
import { SignInResponse } from './entities/sign-in-response.payload';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  async getProfile(@CurrentUser() user: JwtUser) {
    await this.delay(300);
    return this.userService.findOne(user.userId);
  }

  @Mutation(() => AuthPayload)
  async signUp(
    @Args('input') input: CreateUserInput,
    @Context('res') res: Response,
  ) {
    const user = await this.authService.registerUser(input);
    return this.authService.login(user, res);
  }

  @Mutation(() => SignInResponse)
  signIn(@Args('input') input: SignInInput, @Context('res') res: Response) {
    return this.authService.signIn(input, res);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String)
  enable2FA(@CurrentUser() user: JwtUser) {
    return this.authService.generate2FA(user.userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  disable2FA(@CurrentUser() user: JwtUser) {
    return this.authService.disable2FAOption(user.userId);
  }

  @Mutation(() => AuthPayload)
  verify2FALogin(
    @CurrentUser() user: JwtUser,
    @Args('token') token: string,
    @Context('res') res: Response,
  ) {
    return this.authService.verifyAndLoginWith2FA(user.userId, token, res);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async signOut(@Context('res') res: Response) {
    clearAuthCookie(res, this.configService);
    return true;
  }
}
