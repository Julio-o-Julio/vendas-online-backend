import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './exception-filters/prisma.exceptions-filter';
import { ValidationPipe } from '@nestjs/common';
import { UserNotFoundErrorExceptionFilter } from './exception-filters/user-not-found.exceptions-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new UserNotFoundErrorExceptionFilter(),
  );
  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }));

  await app.listen(3000);
}
bootstrap();
