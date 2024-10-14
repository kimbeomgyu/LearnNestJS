import { EntityManager } from '@mikro-orm/mariadb';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';

import { Movie } from '../entity/movie.entity';
import { MoviesService } from './movies.service';

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Test Movie',
    genres: ['test'],
    year: 2000,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const mockEntityManager = {
  getRepository: jest.fn().mockReturnValue({
    create: jest.fn().mockImplementation((movie) => mockMovies.push(movie)),
    findAll: jest.fn().mockReturnValue(mockMovies),
    findOne: jest.fn().mockImplementation(({ id }) => (id === 1 ? mockMovies[0] : null)),
    nativeUpdate: jest.fn().mockImplementation(({ id }, updateData: Partial<Movie>) => {
      const index = mockMovies.findIndex((movie) => movie.id === id);
      if (index === -1) {
        throw new NotFoundException(`Movie with ID ${id} not found.`);
      }
      mockMovies[index] = { ...mockMovies[index], ...updateData };
      return mockMovies[index];
    }),
  }),
};

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: EntityManager,
          useValue: mockEntityManager, // EntityManager 모킹
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array', () => {
      const result = service.browsingMovies();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a movie', async () => {
      const movie = service.findOne(1);
      expect(movie).toBeDefined();
    });

    it('should throw 404 error', async () => {
      try {
        await service.findOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('delete', () => {
    it('deletes a movie', async () => {
      expect(mockMovies[0].deletedAt).toBeNull();
      await service.deleteById(1);
      expect(mockMovies[0].deletedAt).not.toBeNull();
    });
    it('should return a 404', async () => {
      try {
        await service.deleteById(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('add', () => {
    it('should create a movie.', async () => {
      const movie: Movie = {
        id: mockMovies.length + 1,
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      await service.add(movie);
      expect(mockMovies[mockMovies.length - 1]).toEqual(plainToInstance(Movie, movie));
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      await service.update(1, { title: 'Updated Test' });
      const movie = await service.findOne(1);
      expect(movie?.title).toEqual('Updated Test');
    });
  });

  it('should throw a Exception', async () => {
    try {
      await service.update(999, {});
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toEqual('Movie with ID 999 not found.');
    }
  });
});
