import { IsBoolean, IsEmail, IsIn, IsNotEmpty, MinLength } from "class-validator";

export class updateUserDTO{
    readonly username: string;
    @MinLength(8,{message: 'Password must be at least 8 characters'})
    readonly password: string;
    @IsEmail()
    readonly email: string;
    @IsIn(['admin','user'])
    readonly Role: string;
    @IsBoolean()
    readonly isActive: boolean;
}