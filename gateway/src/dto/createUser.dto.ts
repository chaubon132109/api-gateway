import { IsEmail, IsIn, IsNotEmpty, MinLength } from "class-validator";

export class createUserDTO{
    @IsNotEmpty()
    readonly username: string;
    @IsNotEmpty()
    @MinLength(8,{message: 'Password must be at least 8 characters'})
    readonly password: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsIn(['admin','user'])
    readonly Role: string;
}