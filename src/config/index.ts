import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

export const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", '*'], // Allow everything but prioritize same-origin
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", '*'],
      styleSrc: ["'self'", "'unsafe-inline'", '*'],
      fontSrc: ["'self'", '*'],
      imgSrc: ["'self'", 'data:', '*'],
      connectSrc: ["'self'", '*'],
      frameSrc: ["'self'", '*'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
};

export const graphQLConfig = {
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
};

export const csrfConfig = (CSRF_SECRET: string, NODE_ENV: string) => {
  return {
    getSecret: () => CSRF_SECRET || 'my-random-secret-key',
    cookieName: '__Host-x-csrf-token',
    cookieOptions: {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'lax' as const,
    },
    size: 64,
  };
};
