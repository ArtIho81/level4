import { IsEmail, IsString, MinLength } from "class-validator"

export class ChangeUserPasswordDTO {
    @IsEmail()
    email:string

    @IsString()
    @MinLength(4)
    password: string
}