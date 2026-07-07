import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      process.env.FRONTEND_URL || 'http://localhost:3000',
      /\.vercel\.app$/,
    ],

    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],

    credentials: true,

    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;

  await app.listen(port);

  console.log(`Backend running on port ${port}`);
}

bootstrap();
