import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    switch (exception.code) {
      case 'P2002':
        if (exception.message.includes('cpf')) {
          return response.status(409).json({
            statusCode: 409,
            message: 'User with this cpf already exists',
          });
        }
        if (exception.message.includes('email')) {
          return response.status(409).json({
            statusCode: 409,
            message: 'User with this email already exists',
          });
        }

      default:
        break;
    }

    return response.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
}
