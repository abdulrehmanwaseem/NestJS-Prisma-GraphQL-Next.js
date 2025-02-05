import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl !== '/graphql') {
      console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`,
      );
    }
    next();
  }
}
