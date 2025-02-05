import { ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { GqlThrottlerGuard } from '@common/guards/gql-throttler.guard';
import { PrismaModule } from '@common/prisma/prisma.module';
import { graphQLConfig } from './config';

import { LoggerMiddleware } from '@common/middlewares/logger.middleware';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { AuthResolver } from './modules/auth/auth.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      load: [
        () => ({
          DATABASE_URL: process.env.DATABASE_URL,
        }),
      ],
    }),
    PrismaModule,
    ThrottlerModule.forRoot([
      {
        ttl: 45, // 1 minute
        limit: 10, // Max 10 requests per IP in 45 seconds
      },
    ]),
    GraphQLModule.forRootAsync<ApolloDriverConfig>(graphQLConfig),
    UserModule,
    PostModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
    AppService,
    AppResolver,
    AuthResolver,
    AuthService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
