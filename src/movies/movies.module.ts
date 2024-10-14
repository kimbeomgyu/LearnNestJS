import { Module } from '@nestjs/common';

import { MoviesController } from './movies.controller';
import { MovieServiceModule } from './services/movie-service.module';

@Module({
  imports: [MovieServiceModule],
  controllers: [MoviesController],
})
export class MoviesModule {}
