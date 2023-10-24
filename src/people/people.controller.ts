import {
  Controller,
  Get,
  Param,
  Delete,
  Put,
  Body,
  Post,
  Query,
  HttpStatus,
  ParseFilePipeBuilder,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePeopleDTO } from './dto/create-people.dto';
import { UpdatePeopleDTO } from './dto/update-people.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiConsumes,
  ApiHeader,
} from '@nestjs/swagger';
import { ParamIdPipe } from '../people/pipes/param-id.pipe';
import { QueryPagePipe } from '../people/pipes/query-page.pipe';
import { People } from './people.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformInterceptor } from '../utils/interceptors/transform.interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('people')
@ApiTags('People')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @ApiOperation({ summary: 'Get people' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiResponse({ status: HttpStatus.OK, type: [People] })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authentication',
  })
  @Get()
  async getAllPeople(@Query(QueryPagePipe) page: number) {
    return await this.peopleService.getAllPeople(page || 0);
  }

  @ApiOperation({ summary: 'Get person' })
  @ApiParam({ name: 'id', type: 'number', description: 'Person ID' })
  @ApiResponse({ status: HttpStatus.OK, type: People })
  @Get(':id')
  async getById(@Param('id', ParamIdPipe) id: number) {
    return await this.peopleService.getById(id);
  }

  @ApiOperation({ summary: 'Create new person' })
  @ApiResponse({ status: HttpStatus.OK, type: CreatePeopleDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post()
  async addPeople(@Body() dto: CreatePeopleDTO) {
    return await this.peopleService.createPeople(dto);
  }

  @ApiOperation({ summary: 'Update person' })
  @ApiParam({ name: 'id', type: 'number', description: 'Person ID' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdatePeopleDTO })
  @Put(':id')
  async updateById(
    @Param('id', ParamIdPipe) id: number,
    @Body() dto: UpdatePeopleDTO,
  ) {
    return await this.peopleService.updatePeopleById(id, dto);
  }

  @ApiOperation({ summary: 'Delete person' })
  @ApiParam({ name: 'id', type: 'number', description: 'Person ID' })
  @ApiResponse({ status: HttpStatus.OK, type: CreatePeopleDTO })
  @Delete(':id')
  deleteById(@Param('id', ParamIdPipe) id: number) {
    return this.peopleService.deletePeopleById(id);
  } 


  @ApiOperation({ summary: 'Add images for people entity' })
  @ApiParam({ name: 'id', type: 'number', description: 'Person id' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post(':id')
  @UseInterceptors(FileInterceptor('image'))
  addImage(
    @Param('id', ParamIdPipe) id: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/jpeg',
        })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    image: Express.Multer.File,
  ) {
    return this.peopleService.addImageForPerson(id, image);
  }

}
