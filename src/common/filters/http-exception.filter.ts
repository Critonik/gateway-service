import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpExceptionBody } from '@nestjs/common/interfaces/http/http-exception-body.interface';

interface ErrorResponse {
  code: string;
  message: string;
  details?: unknown;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const originalResponse = exception.getResponse();

    let body: ErrorResponse = {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error',
    };

    if (typeof originalResponse === 'string') {
      body = {
        code: 'ERROR',
        message: originalResponse,
      };
    } else if (typeof originalResponse === 'object') {
      console.log(originalResponse);
      const r = originalResponse;
      body = {
        // @ts-expect-error test
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        code: r.statusCode ?? 'ERROR',
        // @ts-expect-error test
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message: r.message ?? 'Unexpected error',
        // @ts-expect-error test
        details: r.details,
      };
    }

    response.status(status).json(body);
  }
}
