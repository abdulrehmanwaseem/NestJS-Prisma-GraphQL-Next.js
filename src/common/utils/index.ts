import { Response } from 'express';

export function setAuthCookie(res: Response, token: string, NODE_ENV: string) {
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  });
}
