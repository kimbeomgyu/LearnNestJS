import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { Movie } from '../entity/movie.entity';
import { MoviesService } from './movies.service';

@Module({
  imports: [MikroOrmModule.forFeature([Movie])],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MovieServiceModule {}
