import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log", "debug", "verbose", "fatal"],
  });
  app.enableCors();

  await app.listen(process.env.PORT ?? 6131);

  const logger = new Logger("Bootstrap");
  logger.debug(`This application is runnning on: ${await app.getUrl()}`);
}
bootstrap();
