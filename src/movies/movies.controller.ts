import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { MoviesService } from './services/movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  browsingMovies(): Promise<Movie[]> {
    return this.moviesService.browsingMovies();
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie with made after: ${searchingYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: number): Promise<Movie | null> {
    console.log(typeof movieId);
    return this.moviesService.findOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.add(movieData);
  }

  @Delete(':id')
  delete(@Param('id') movieId: number) {
    return this.moviesService.deleteById(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
