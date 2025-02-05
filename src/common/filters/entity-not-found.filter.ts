import {
  ArgumentsHost,
  Catch,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class EntityNotFoundFilter<T> implements GqlExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    switch (exception.code) {
      case 'P2025':
        return new NotFoundException('Entity not found');
      case 'P2002':
        return new ConflictException(
          `Duplicate entry ${exception?.meta?.target}`,
        );
      default:
        return new InternalServerErrorException('Database error');
    }
  }
}
