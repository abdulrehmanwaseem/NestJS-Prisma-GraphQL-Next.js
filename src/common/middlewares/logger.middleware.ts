import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp()),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logs/app.log' }),
    ],
  });

  use(req: Request, res: Response, next: NextFunction) {
    const logData: Record<string, any> = {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    };

    if (req.body?.query) {
      logData.body = { query: req.body.query.replace(/\s+/g, ' ').trim() }; // Minify GraphQL query
    }

    if (Object.keys(req.params).length) logData.params = req.params;
    if (Object.keys(req.query).length) logData.query = req.query;
    if (req.user) logData.user = req.user;

    this.logger.info(logData);
    next();
  }
}
