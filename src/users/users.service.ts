import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { Users } from './users.entity';
import { dataSource } from '../db/data-source';
import { E_Roles } from './roles';
import * as bcrypt from 'bcrypt';
import { ChangeUserPasswordDTO } from './dto/change-user-password.dto';

@Injectable()
export class UsersService {
  async addNewUser(dto: CreateUserDTO) {
    const candidate = await this.getUser(dto.email)
    if (candidate)
      throw new BadRequestException(`User ${dto.email} already exist`);
    const user = new Users();
    user.email = dto.email;
    user.password = await bcrypt.hash(dto.password, 10);
    user.role = dto.role;
    const registeredUser = await dataSource.manager.save(user);
    const { password, ...rest } = registeredUser;
    return rest;
  }

  async changeUserPassword(dto: ChangeUserPasswordDTO) {
    const user = await this.getUser(dto.email);
    if (!user) throw new NotFoundException();
    user.password = await bcrypt.hash(dto.password, 10);
    return await dataSource.manager.save(user);
  }
  async getUser(email: string) {
    return await dataSource.getRepository(Users).findOneBy({ email });
  }
}
