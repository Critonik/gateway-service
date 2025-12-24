import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AxiosErrorInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: unknown) => {
        if (error instanceof AxiosError && error.response) {
          const data = error.response.data as AxiosError;
          const { status } = error.response;

          throw new HttpException(
            data ?? {
              code: 'UPSTREAM_ERROR',
              message: 'Upstream service error',
              details: null,
            },
            status ?? HttpStatus.BAD_GATEWAY,
          );
        }

        throw error;
      }),
    );
  }
}
