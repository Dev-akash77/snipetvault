import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs';
import { SUCCESS_MESSAGE_KEY } from '../decorators/success-message.decorator';

@Injectable()
export class ResponseInterceptor  implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const handler = context.getHandler();
    const controller = context.getClass();

    const message =
      this.reflector.get<string>(SUCCESS_MESSAGE_KEY, handler) ||
      this.reflector.get<string>(SUCCESS_MESSAGE_KEY, controller) ||
      'Request  successfull';

    return next.handle().pipe(
      map((data) => ({
        success: true,
        message,
        data,
      })),
    );
  }
}
