import { EntityManager, EntityRepository } from '@mikro-orm/mariadb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '../entity/movie.entity';

@Injectable()
export class MoviesService {
  private readonly movieRepository: EntityRepository<Movie>;

  constructor(private readonly em: EntityManager) {
    this.movieRepository = this.em.getRepository(Movie);
  }

  browsingMovies(): Promise<Movie[]> {
    return this.movieRepository.findAll({
      where: {
        deletedAt: null,
      },
    });
  }

  findOne(id: number): Promise<Movie | null> {
    return this.movieRepository.findOne({ id, deletedAt: null });
  }

  async deleteById(id: number): Promise<void> {
    await this.movieRepository.nativeUpdate({ id }, { deletedAt: new Date() });
  }

  async add(movieData: CreateMovieDto): Promise<Movie> {
    return this.movieRepository.create(plainToInstance(Movie, movieData));
  }

  async update(id: number, updateData: UpdateMovieDto): Promise<void> {
    const movie = await this.movieRepository.findOne({ id });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }

    await this.movieRepository.nativeUpdate({ id }, { ...movie, ...updateData });
  }
}
