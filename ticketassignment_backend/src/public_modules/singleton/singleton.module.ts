import { Global, Module } from '@nestjs/common';
import { SingletonService } from '@public_modules/singleton/singleton.service';

/**
 * SingletonModule is a global module that provides a SingletonService
 * which can be used throughout the entire application to manage global variables.
 */
@Global()
@Module({
  providers: [SingletonService],
  exports: [SingletonService],
})
export class SingletonModule {}
