import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { NotFoundError } from '../errors/not-found.error';

@Catch(NotFoundError)
export class NotFoundErrorExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    return response.status(404).json({
      statusCode: 404,
      message: exception.message,
    });
  }
}
