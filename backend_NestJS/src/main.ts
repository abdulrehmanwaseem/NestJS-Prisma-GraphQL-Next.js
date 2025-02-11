import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { PrismaExceptionFilter } from '@common/filters/prisma-exception.filter';
import { GraphQLLoggerInterceptor } from '@common/interceptors/gql-logger.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { doubleCsrf } from 'csrf-csrf';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { csrfConfig, helmetConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const NODE_ENV = configService.get<string>('NODE_ENV');
  const port = configService.get<number>('PORT');
  const allowedOrigin = configService.get<string>('CSRF_TRUSTED_ORIGIN');

  const { doubleCsrfProtection } = doubleCsrf(
    csrfConfig(configService.get<string>('CSRF_SECRET'), NODE_ENV),
  );

  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new GraphQLLoggerInterceptor());

  app.use(helmet(helmetConfig));
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:4000',
      'http://localhost:5173',
      'http://localhost:3000',
    ],
  });
  // app.use(doubleCsrfProtection); // ✅ Use for high security

  const config = new DocumentBuilder()
    .setTitle('NestJS-Prisma-GraphQL API')
    .setDescription(
      'GraphQL is available at `/graphql`. Use [GraphQL Playground](http://localhost:4000/graphql) to test queries.',
    )
    .setVersion('1.0')
    .addCookieAuth()
    .addTag('GraphQL is available at /graphql')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);
  console.log(
    `🚀 Server is running on http://localhost:${port} in ${NODE_ENV} mode`,
  );
}
bootstrap();
