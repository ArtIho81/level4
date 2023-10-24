import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { SpeciesService } from './species.service';
import { ApiTags } from '@nestjs/swagger';
import { ParamIdPipe } from '../people/pipes/param-id.pipe';
import { CreateSpeciesDTO } from './dto/create-species.dto';
import { UpdateSpeciesDTO } from './dto/update-species.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags("Species")
@Controller('species')
@UseGuards(JwtAuthGuard)
export class SpeciesController {
constructor(private readonly speciesService: SpeciesService) {}

@Get()
  getAllSpecies() {
    return this.speciesService.getAllSpecies();
  }
  @Get(':id')
  getSpeciesById(@Param('id', ParamIdPipe) id: number) {
    return this.speciesService.getSpeciesById(id);
  }
  @Post()
  addSpecies(@Body() dto: CreateSpeciesDTO) {
    return this.speciesService.addSpecies(dto);
  }

  @Put()
  updateSpecies(@Param('id', ParamIdPipe) id: number, @Body() dto: UpdateSpeciesDTO) {
    return this.speciesService.updateSpecies(id, dto)
  }

  @Delete()
  deleteSpecies(@Param('id', ParamIdPipe) id: number) {
    return this.speciesService.deleteSpecies(id)
  }
}
