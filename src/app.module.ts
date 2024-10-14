import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { TransactionInterceptor } from './database/transaction.interceptor';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    MoviesModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransactionInterceptor,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
