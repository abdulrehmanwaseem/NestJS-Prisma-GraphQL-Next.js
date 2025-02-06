import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

export function setAuthCookie(
  res: Response,
  token: string,
  configService: ConfigService,
) {
  res.cookie('user_token', token, {
    httpOnly: true,
    secure: configService.get<string>('NODE_ENV') === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  });
}
