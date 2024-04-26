import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: 'http://localhost:3000'
  });
  app.useGlobalPipes(new ValidationPipe)
  const port = process.env.PROJECT_PORT
  await app.listen(port,()=> console.log(`server running on port ${port}`));
}
bootstrap();
