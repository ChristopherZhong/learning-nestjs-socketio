import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getLogLevels } from './logging';
import { setSecurityHeaders } from './security-headers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(),
  });
  setSecurityHeaders(app);
  app.enableCors({
    origin: (_origin, callback) => {
      const url = process.env.APP_REGISTRATION_URL;
      const error = url == undefined ? new Error('CORS is undefined') : null;
      callback(error, url);
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
