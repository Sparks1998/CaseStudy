import { CallHandler , ExecutionContext , Injectable , NestInterceptor  } from '@nestjs/common';
import { map , Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * MainInterceptor intercepts GraphQL responses and modifies the response data.
 * It sets the Authorization header when a token is present and extracts the actual data from the response.
 */
@Injectable()
export class MainInterceptor implements NestInterceptor {
  /**
   * Intercepts the response stream, modifies headers, and maps the response data.
   * @param context ExecutionContext for the current request.
   * @param next CallHandler to continue the request lifecycle.
   * @returns An observable of the response data, potentially modified.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlExecutionContext.create(context);
    const res = gqlContext.getContext().res;

    return next.handle().pipe(
      map((value) => {
        if (typeof value === 'object') {
          if ('token' in value) {
            res.header('Authorization', `Bearer ${value.token}`);
            return value.data;
          }
        }

        return value;
      }),
    );
  }
}
