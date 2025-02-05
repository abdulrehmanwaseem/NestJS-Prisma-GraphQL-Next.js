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
    // For HTTP context
    const httpCtx = host.switchToHttp();
    const response = httpCtx.getResponse<Response>();

    // For GraphQL context
    const gqlHost = GqlArgumentsHost.create(host);

    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    // Normalize the error message: if it's an object with a message property, or if it's an array
    let errorMessages: string[] = [];
    if (
      typeof errorResponse === 'object' &&
      errorResponse.hasOwnProperty('message')
    ) {
      const msg = (errorResponse as any).message;
      if (Array.isArray(msg)) {
        errorMessages = msg;
      } else {
        errorMessages.push(msg);
      }
    } else if (typeof errorResponse === 'string') {
      errorMessages.push(errorResponse);
    } else {
      errorMessages.push('Unknown error');
    }

    // Combine error messages
    const combinedMessage = errorMessages.join(' | ');

    // If an HTTP response object exists, we're in an HTTP context
    if (response && typeof response.status === 'function') {
      response.status(status).json({
        statusCode: status,
        message: combinedMessage,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Otherwise, we're in a GraphQL context—throw a new HttpException with the combined message
    throw new HttpException(
      {
        statusCode: status,
        message: combinedMessage,
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }
}
