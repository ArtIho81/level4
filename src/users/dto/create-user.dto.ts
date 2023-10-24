import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { E_Roles } from "../roles";

export class CreateUserDTO {

    @IsEmail()
    email:string

    @IsString()
    @MinLength(4)
    password: string

    @IsOptional()
    @IsEnum(E_Roles)
    role?: string
}