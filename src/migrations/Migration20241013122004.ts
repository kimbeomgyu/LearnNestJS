import { Migration } from '@mikro-orm/migrations';

export class Migration20241013122004 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`movie\` (\`id\` int unsigned not null auto_increment primary key, \`title\` varchar(255) not null comment '영화 제목', \`year\` smallint not null comment '영화 제작 연도', \`genres\` text not null comment '영화 장르', \`created_at\` datetime not null, \`updated_at\` datetime not null, \`deleted_at\` datetime null default null) default character set utf8mb4 engine = InnoDB;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`movie\`;`);
  }

}
