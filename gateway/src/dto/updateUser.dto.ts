import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsIn, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class updateUserDTO{
    @IsOptional()
    @ApiProperty()
    readonly username: string;
    @MinLength(8,{message: 'Password must be at least 8 characters'})
    @ApiProperty()
    readonly password: string;
    @IsEmail()
    @ApiProperty()
    readonly email: string;
    @IsIn(['admin','user'])
    @ApiProperty()
    readonly Role: string;
    @IsBoolean()
    @ApiProperty()
    readonly isActive: boolean;
}