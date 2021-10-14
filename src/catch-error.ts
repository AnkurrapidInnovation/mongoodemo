import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
// import * as Sentry from '@sentry/node';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // eslint-disable-next-line prettier/prettier
    const status = exception ? 400 : HttpStatus.INTERNAL_SERVER_ERROR;
    // const transaction = Sentry.startTransaction({
    //   op: 'Backend Error Tracking',
    //   name: 'Error Transaction'
    // });
    // Sentry.captureException(exception);
    // transaction.finish();
    response.status(400).json({
      error: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      test: Error
    });
  }
}
@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // eslint-disable-next-line prettier/prettier
    const status = exception ? 400 : HttpStatus.INTERNAL_SERVER_ERROR;
    // const transaction = Sentry.startTransaction({
    //   op: 'Backend Error Tracking',
    //   name: 'Requested URL Not found'
    // });
    // Sentry.captureException(exception);
    // transaction.finish();
    response.status(200).json('Better Luck next Time....');
  }
}
