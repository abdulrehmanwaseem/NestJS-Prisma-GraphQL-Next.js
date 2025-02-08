import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class GraphQLLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlExecutionContext.create(context);
    const operationName = gqlContext.getInfo().path?.key || 'Unnamed Handler';
    const operationType = gqlContext.getInfo().path?.typename || 'Unknown Type';

    console.log(
      `📊 GraphQL Log: [Operation Type: "${operationType}"] [Handler: "${operationName}"]`,
    );

    return next.handle();
  }
}
