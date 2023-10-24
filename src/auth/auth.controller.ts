import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ summary: 'Auth user' })
    @ApiBody({})
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() dto: CreateUserDTO) {
        return await this.authService.register(dto)
    }
}
