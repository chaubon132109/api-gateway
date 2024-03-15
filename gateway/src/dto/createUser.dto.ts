import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, MinLength } from "class-validator";

export class createUserDTO{
    @IsNotEmpty()
    @ApiProperty()
    readonly username: string;
    @IsNotEmpty()
    @ApiProperty()
    @MinLength(8,{message: 'Password must be at least 8 characters'})
    readonly password: string;
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    readonly email: string;
    @IsIn(['admin','user'])
    @ApiProperty()
    readonly Role: string;
}