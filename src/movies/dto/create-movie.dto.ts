import { PickType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { Movie } from '../entity/movie.entity';

export class CreateMovieDto extends PickType(Movie, ['title', 'year', 'genres'] as const) {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value.join(',') : value)) // Convert array to string
  readonly genres: string[];
}
