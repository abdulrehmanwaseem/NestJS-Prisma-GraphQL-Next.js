import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

export function setAuthCookie(
  res: Response,
  token: string,
  configService: ConfigService,
) {
  res.cookie(configService.get<string>('JWT_TOKEN_NAME'), token, {
    httpOnly: true,
    secure: configService.get<string>('NODE_ENV') === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  });
}

export function clearAuthCookie(res: Response, configService: ConfigService) {
  res.clearCookie(configService.get<string>('JWT_TOKEN_NAME'), {
    httpOnly: true,
    secure: configService.get<string>('NODE_ENV') === 'production',
    sameSite: 'lax',
  });
}
