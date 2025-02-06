import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { Request, Response, NextFunction } from 'express';

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
  useFactory: (configService: ConfigService) => {
    const isDEV = configService.get<string>('NODE_ENV') === 'development';

    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: isDEV,
      playground: isDEV,
      introspection: isDEV,
      context: ({ req, res }) => ({ req, res }),
    };
  },
};

//  cors: {
//     credentials: true,
//     origin: ['http://localhost:8080'],
//   }
// const GraphQL = GraphQLModule.forRoot<ApolloDriverConfig>({
//   driver: ApolloDriver,
//   playground: {
//     settings: {
//       'request.credentials': 'include', // Otherwise cookies won't be sent
//     },
//   },
//   // ...
// });

// cors: { origin: true, credentials: true },

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

interface CsrfConfig {
  allowedOrigin: string;
}

export function customCsrfProtection(config: CsrfConfig) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { allowedOrigin } = config;

    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      return next();
    }

    const origin = req.headers.origin || req.headers.referer;

    if (!origin || !origin.startsWith(allowedOrigin)) {
      return res.status(403).json({ error: 'Invalid CSRF request' });
    }

    next();
  };
}
