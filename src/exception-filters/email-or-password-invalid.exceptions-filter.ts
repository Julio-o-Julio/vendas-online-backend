import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EmailOrPasswordInvalidError } from 'src/errors/email-or-password-invalid.error';

@Catch(EmailOrPasswordInvalidError)
export class EmailOrPasswordInvalidErrorExceptionFilter
  implements ExceptionFilter
{
  catch(exception: EmailOrPasswordInvalidError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    return response.status(404).json({
      statusCode: 404,
      message: exception.message,
    });
  }
}
