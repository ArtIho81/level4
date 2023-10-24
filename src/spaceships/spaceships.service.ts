import { Injectable, NotFoundException } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { CreateSpaceshipsDTO } from './dto/create-spaceships.dto';
import { dataSource } from '../db/data-source';
import { Spaceships } from './spaceships.entity';
import { UpdateSpaceshipsDTO } from './dto/update-spaceships.dto';
import { SpaceshipsResponse } from '../utils/types';

@Injectable()
export class SpaceshipsService {
  constructor(private readonly utilsService: UtilsService) {}

  async getAllSpaceships(): Promise<SpaceshipsResponse[]> {
    const starships = await dataSource.manager.getRepository(Spaceships).find();
    return await Promise.all(
      starships.map(
        async (starship) =>
          await this.utilsService.makeRelatedEntityResponse(starship),
      ),
    );
  }

  async getSpaceshipById(id: number): Promise<SpaceshipsResponse> {
    const starship = await dataSource.manager
      .getRepository(Spaceships)
      .findOneBy({ id });
      if(!starship) throw new NotFoundException()
    return this.utilsService.makeRelatedEntityResponse(starship);
  }

  async addSpaceship(dto: CreateSpaceshipsDTO) {
    let starship = new Spaceships();
    starship = await this.utilsService.createEntityInstance(starship, dto);
    return await dataSource.manager.save(starship);
  }

  async updateSpaceship(id: number, dto: UpdateSpaceshipsDTO) {
    let starship = await dataSource.getRepository(Spaceships).findOneBy({ id });
    if(!starship) throw new NotFoundException()
    starship = await this.utilsService.createEntityInstance(starship, dto)
    return await dataSource.manager.save(starship);
  }

  async deleteSpaceship(id: number) {
    let starship = await dataSource.manager.findOneBy(Spaceships, { id });
    if (!starship) throw new NotFoundException()
    starship = await this.utilsService.clearProps(starship);
    await dataSource.manager.save(starship);
    return dataSource.manager.remove(starship);
  }
}
