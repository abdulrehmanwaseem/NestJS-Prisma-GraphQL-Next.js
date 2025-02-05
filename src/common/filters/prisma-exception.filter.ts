import {
  ArgumentsHost,
  Catch,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements GqlExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.log(exception);

    switch (exception.code) {
      case 'P2025':
        return new NotFoundException('Entity not found');

      case 'P2002':
        return new ConflictException(
          `Duplicate entry: ${exception?.meta?.target}`,
        );

      case 'P2003':
        return new BadRequestException(
          `Foreign key constraint violation on field: ${exception?.meta?.field_name}`,
        );

      default:
        return new InternalServerErrorException('Database error');
    }
  }
}
