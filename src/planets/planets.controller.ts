import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlanetsService } from './planets.service';
import { ParamIdPipe } from '../people/pipes/param-id.pipe';
import { CreatePlanetsDTO } from './dto/create-planets.dto';
import { updatePlanetsDTO } from './dto/update-planets.dto';
import { TransformInterceptor } from '../utils/interceptors/transform.interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('planets')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
@ApiTags('Planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  getAllPlanets() {
    return this.planetsService.getAllPlanets();
  }
  @Get(':id')
  getPlanetById(@Param('id', ParamIdPipe) id: number) {
    return this.planetsService.getPlanetById(id);
  }
  @Post()
  addPlanet(@Body() dto: CreatePlanetsDTO) {
    return this.planetsService.addPlanet(dto);
  }
  @Put()
  updateFilm(
    @Param('id', ParamIdPipe) id: number,
    @Body() dto: updatePlanetsDTO,
  ) {
    return this.planetsService.updatePlanet(id, dto);
  }
  @Delete()
  deletePlanet(@Param('id', ParamIdPipe) id: number) {
    return this.planetsService.deletePlanet(id);
  }
}
