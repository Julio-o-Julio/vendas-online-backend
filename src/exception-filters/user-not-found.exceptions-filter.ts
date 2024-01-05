import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { UserNotFoundError } from 'src/errors/user-not-found.error';

@Catch(UserNotFoundError)
export class UserNotFoundErrorExceptionFilter implements ExceptionFilter {
  catch(exception: UserNotFoundError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    return response.status(422).json({
      statusCode: 422,
      message: exception.message,
    });
  }
}
