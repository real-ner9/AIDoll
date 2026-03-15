import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://aidoll-207-180-218-99.sslip.io',
      /\.sslip\.io$/,
    ],
    credentials: true,
  });
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
