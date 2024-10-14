import { Movie } from '@/movies/entity/movie.entity';
import { Options } from '@mikro-orm/core';
import { MariaDbDriver } from '@mikro-orm/mariadb';
import { Migrator } from '@mikro-orm/migrations';

const entities = [Movie];

const config: Options = {
  entities, // 엔티티 경로 설정
  dbName: 'database',
  user: 'root',
  password: 'password',
  driver: MariaDbDriver,
  extensions: [Migrator],
  debug: true, // 개발 환경에서 디버깅을 위해 활성화 가능
};

export default config;
