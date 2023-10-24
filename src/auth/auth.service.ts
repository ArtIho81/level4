import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private readonly jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUser(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...rest } = user;
            return rest;
        }
        return null;
    }

    async login(user: any) {
        const payload = { name: user.email, sub: user.id }
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }

    async register(user: any) {
        return await this.usersService.addNewUser(user)
    }
}
