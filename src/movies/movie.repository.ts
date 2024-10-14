import { EntityRepository } from '@mikro-orm/mariadb';
import { Injectable } from '@nestjs/common';

import { Movie } from './entity/movie.entity';

@Injectable()
export class MovieRepository extends EntityRepository<Movie> {}
