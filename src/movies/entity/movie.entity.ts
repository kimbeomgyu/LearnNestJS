import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'movie' })
export class Movie {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property({
    type: 'varchar',
    length: 255,
    comment: '영화 제목',
  })
  title: string;

  @Property({
    type: 'smallint',
    comment: '영화 제작 연도',
  })
  year: number;

  @Property({
    type: 'varchar',
    comment: '영화 장르',
  })
  genres: string[];

  @Property({
    type: 'timestamp',
    onCreate: () => 'now()',
  })
  createdAt = new Date();

  @Property({
    type: 'timestamp',
    onCreate: () => 'now()',
    onUpdate: () => 'now()',
  })
  updatedAt = new Date();

  @Property({
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  deletedAt: Date | null;
}
