import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParamIdPipe } from '../people/pipes/param-id.pipe';
import { VehiclesService } from './vehicles.service';
import { CreateVehiclesDTO } from './dto/create-vehicles.dto';
import { UpdateVehiclesDTO } from './dto/update-vehicles.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Vehicles')
@Controller('vehicles')
@UseGuards(JwtAuthGuard)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  getAllVehicles() {
    return this.vehiclesService.getAllVehicles();
  }

  @Get(':id')
  getVehicleById(@Param('id', ParamIdPipe) id: number) {
    return this.vehiclesService.getVehicleById(id);
  }
  
  @Post()
  addVehicle(@Body() dto: CreateVehiclesDTO) {
    return this.vehiclesService.addVehicle(dto);
  }

  @Put()
  updateVehicle(@Param('id', ParamIdPipe) id:number, @Body() dto: UpdateVehiclesDTO) {
    return this.vehiclesService.updateVehicle(id, dto)
  }

  @Delete()
  deleteVehicle(@Param('id', ParamIdPipe) id: number) {
    return this.vehiclesService.deleteVehicle(id)
 }
}
