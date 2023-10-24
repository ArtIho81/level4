import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SpaceshipsService } from './spaceships.service';
import { ApiTags } from '@nestjs/swagger';
import { ParamIdPipe } from '../people/pipes/param-id.pipe';
import { CreateSpaceshipsDTO } from './dto/create-spaceships.dto';
import { UpdateSpaceshipsDTO } from './dto/update-spaceships.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('starships')
@ApiTags("Spaceships")
@UseGuards(JwtAuthGuard)
export class SpaceshipsController {
    constructor(private readonly spaceshipsService: SpaceshipsService){}
    
    @Get()
      getAllSpaceships() {
        return this.spaceshipsService.getAllSpaceships();
      }

      @Get(':id')
      getSpaceshipById(@Param('id', ParamIdPipe) id: number) {
        return this.spaceshipsService.getSpaceshipById(id);
      }
      
      @Post()
      addSpaceship(@Body() dto: CreateSpaceshipsDTO) {
        return this.spaceshipsService.addSpaceship(dto);
      }

      @Put()
      updateSpaceship(@Param('id', ParamIdPipe) id: number, @Body() dto: UpdateSpaceshipsDTO) {
        return this.spaceshipsService.updateSpaceship(id, dto)
      }

      @Delete()
      deleteSpaceship(@Param('id', ParamIdPipe) id: number) {
        return this.spaceshipsService.deleteSpaceship(id)
      }
}
