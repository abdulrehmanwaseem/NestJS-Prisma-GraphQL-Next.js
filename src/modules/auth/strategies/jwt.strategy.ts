import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { AuthJwtPayload } from '../types/auth-jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null =>
          req?.cookies[configService.get<string>('JWT_TOKEN_NAME')] || null,
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }
  async validate(payload: AuthJwtPayload) {
    const { userId } = payload.sub;

    const jwtUser = await this.authService.validateJwtUser(userId);

    return jwtUser;
  }
}
