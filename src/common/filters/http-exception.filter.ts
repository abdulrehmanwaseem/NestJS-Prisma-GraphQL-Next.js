import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const gqlCtx = GqlArgumentsHost.create(host);
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    if (response && typeof response.status === 'function') {
      response.status(status).json({
        statusCode: status,
        message: typeof message === 'object' ? message['message'] : message,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const gqlResponse = gqlCtx.getContext();
    throw new HttpException(
      {
        statusCode: status,
        message: typeof message === 'object' ? message['message'] : message,
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }
}
