import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './films.entity';
import { UtilsService } from '../utils/utils.service';
import { ImagesModule } from '../images/images.module';

@Module({
  imports:[TypeOrmModule.forFeature([Films]), ImagesModule],
  controllers: [FilmsController],
  providers: [FilmsService, UtilsService],
  exports: [TypeOrmModule]
})
export class FilmsModule {}
