import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APIPrefix } from './constant/constant';
import { AllExceptionsFilter } from './error-handler/all-exceptions-filter';
import { DTOValidationPipe } from './error-handler/dto-validation-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new DTOValidationPipe());

  app.setGlobalPrefix(APIPrefix.Version);

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
