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
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from '@common/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
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
  ],
  controllers: [],
  providers: [
    AppService,
    AppResolver,
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
