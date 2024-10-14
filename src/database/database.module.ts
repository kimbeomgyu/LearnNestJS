import { MikroORM } from '@mikro-orm/core';
import { MariaDbDriver } from '@mikro-orm/mariadb';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        strict: true,
        schemaGenerator: {
          emit: 'ts',
          createForeignKeyConstraints: true,
        },
        driver: MariaDbDriver,
        autoLoadEntities: true,
        dbName: config.getOrThrow('MARIADB_DATABASE'),
        user: config.getOrThrow('MARIADB_USER'),
        password: config.getOrThrow('MARIADB_PASSWORD'),
        host: config.getOrThrow('MARIADB_HOST'),
        port: Number(config.getOrThrow('MARIADB_PORT')),
        debug: true,
      }),
    }),
  ],
})
export class DatabaseModule implements OnApplicationShutdown {
  constructor(private readonly orm: MikroORM) {}

  async onApplicationShutdown(): Promise<void> {
    await this.orm.close();
    console.log('Shutting down...');
  }
}
