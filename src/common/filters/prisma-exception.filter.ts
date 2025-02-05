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

      case 'P2014':
        return new BadRequestException(
          `Invalid relation: The change you tried to make would violate required relations.`,
        );

      case 'P2016':
        return new InternalServerErrorException(
          `Query validation error: ${exception?.message}`,
        );

      case 'P2018':
        return new NotFoundException(`Record not found: ${exception?.message}`);

      case 'P2021':
        return new InternalServerErrorException(
          `Unknown table or column: ${exception?.meta?.column_name}`,
        );

      case 'P2022':
        return new BadRequestException(
          `Invalid value for column: ${exception?.meta?.column_name}`,
        );

      default:
        return new InternalServerErrorException(
          `Database error: ${exception.message}`,
        );
    }
  }
}
