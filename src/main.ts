import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './exception-filters/prisma.exceptions-filter';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundErrorExceptionFilter } from './exception-filters/not-found.exceptions-filter';
import { EmailOrPasswordInvalidErrorExceptionFilter } from './exception-filters/email-or-password-invalid.exceptions-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new NotFoundErrorExceptionFilter(),
    new EmailOrPasswordInvalidErrorExceptionFilter(),
  );
  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }));

  await app.listen(3000);
}
bootstrap();
