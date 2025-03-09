/**
 * Bootstrap function to initialize and start the NestJS application.
 * It sets up global interceptors and validation pipes, and starts the application server.
 */

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { MainInterceptor } from '@/interceptors/main/main-interceptor.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: false,
  });

  /**
   * Applies a global serialization interceptor to handle automatic transformation
   * of response objects based on @Exclude and @Expose decorators.
   */
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  /**
   * Registers the MainInterceptor globally to handle custom request and response logic.
   */
  app.useGlobalInterceptors(new MainInterceptor());

  /**
   * Sets up global validation using ValidationPipe to automatically validate incoming requests
   * against DTOs and apply validation rules.
   */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Starts the application on the specified port or default to port 3000.
   */
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
  .then()
  .catch((err) => {
    console.log(err);
  });
