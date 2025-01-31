import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { GqlThrottlerGuard } from './common/guard/gqlThrottler.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    PrismaModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        debug: configService.get<string>('NODE_ENV') === 'development',
        playground: true,
        introspection: true,
        context: ({ req, res }) => ({ req, res }),
      }),
    }),
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
