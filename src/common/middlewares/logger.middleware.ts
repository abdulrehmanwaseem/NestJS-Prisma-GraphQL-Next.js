import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logs/app.log' }),
    ],
  });

  use(req: Request, res: Response, next: NextFunction) {
    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      query: req.query,
      params: req.params,
      body: this.filterSensitiveData(req.body),
      ip: req.ip,
      hostname: req.hostname,
      userAgent: req.headers['user-agent'],
      user: req.user || 'Not authenticated',
    };

    this.logger.info(logData);
    next();
  }

  private filterSensitiveData(body: any) {
    if (!body || typeof body !== 'object') return body;
    const filteredBody = { ...body };

    // Add keys you want to hide (passwords, tokens, etc.)
    const sensitiveKeys = ['password', 'token', 'secret'];
    sensitiveKeys.forEach((key) => {
      if (filteredBody[key]) {
        filteredBody[key] = '***';
      }
    });

    return filteredBody;
  }
}
