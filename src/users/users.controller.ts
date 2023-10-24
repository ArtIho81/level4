import { Body, Controller, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChangeUserPasswordDTO } from './dto/change-user-password.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post()
    async addNewUser(@Body() dto: CreateUserDTO) {
        return this.userService.addNewUser(dto)
    }

    @Put(':id')
    async changeUserPassword(@Body() dto: ChangeUserPasswordDTO) {
        return this.userService.changeUserPassword(dto)
    }
}
