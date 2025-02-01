import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { GqlThrottlerGuard } from './common/guard/gqlThrottler.guard';
import { PrismaModule } from './common/prisma/prisma.module';
import { graphQLConfig } from './config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    PrismaModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60, // 1 minute window
        limit: 10, // Max 10 requests per IP in 60 seconds
      },
    ]),
    GraphQLModule.forRootAsync<ApolloDriverConfig>(graphQLConfig),
    UserModule,
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
export class AppModule {}
