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
      // set cors to '*'
      callback(null, '*');
    },
  });
  // global pipes does not work on websocket gateways
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
