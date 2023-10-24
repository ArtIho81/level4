import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from './people/people.module';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './db/data-source';
import { ImagesModule } from './images/images.module';
import { PlanetsModule } from './planets/planets.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { SpeciesModule } from './species/species.module';
import { FilmsModule } from './films/films.module';
import { SpaceshipsModule } from './spaceships/spaceships.module';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from './s3/s3.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({ envFilePath: './.env' }),
    PeopleModule,
    ImagesModule,
    PlanetsModule,
    SpaceshipsModule,
    VehiclesModule,
    SpeciesModule,
    FilmsModule,
    S3Module,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private dataSourse: DataSource) {}
}
