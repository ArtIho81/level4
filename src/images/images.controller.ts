import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ParamIdPipe } from '../people/pipes/param-id.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('images')
@ApiTags('Images')
@UseGuards(JwtAuthGuard)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiOperation({ summary: 'Delete people entity images' })
  @ApiParam({ name: 'id', type: 'number', description: 'Image id' })
  @Delete(':id')
  async deleteImage(@Param('id', ParamIdPipe) id: number) {
    return await this.imagesService.deleteImage(id);
  }
}
