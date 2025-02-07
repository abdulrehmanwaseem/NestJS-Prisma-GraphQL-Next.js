import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { doubleCsrf } from 'csrf-csrf';
import { csrfConfig, customCsrfProtection, helmetConfig } from './config';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { GraphQLLoggerInterceptor } from '@common/interceptors/gql-logger.interceptor';
import { PrismaExceptionFilter } from '@common/filters/prisma-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
    origin: ['http://localhost:4000', 'http://localhost:5173/'],
  });
  // app.use(doubleCsrfProtection); // ✅ Use for high security
  // app.use(customCsrfProtection({ allowedOrigin }));

  const config = new DocumentBuilder()
    .setTitle('NestJS-Prisma-GraphQL API')
    .setDescription('Full documentation for this API')
    .setVersion('1.0')
    .addCookieAuth()
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
