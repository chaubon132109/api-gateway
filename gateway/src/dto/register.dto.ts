import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class registerDTO{
    @IsNotEmpty()
    @ApiProperty()
    readonly username: string;
    @IsNotEmpty()
    @MinLength(8,{message: 'Password must be at least 8 characters'})
    @ApiProperty()
    readonly password: string;
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    readonly email: string;
}