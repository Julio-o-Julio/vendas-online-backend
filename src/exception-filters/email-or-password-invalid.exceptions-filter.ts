import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EmailOrPasswordInvalidError } from '../errors/email-or-password-invalid.error';

@Catch(EmailOrPasswordInvalidError)
export class EmailOrPasswordInvalidErrorExceptionFilter
  implements ExceptionFilter
{
  catch(exception: EmailOrPasswordInvalidError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    return response.status(401).json({
      statusCode: 401,
      message: exception.message,
    });
  }
}
