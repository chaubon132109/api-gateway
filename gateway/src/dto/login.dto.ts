import { IsNotEmpty, MinLength } from "class-validator";

export class loginDTO{
    @IsNotEmpty()
    readonly username: string;
    @IsNotEmpty()
    @MinLength(8,{message: 'Password must be at least 8 characters'})
    readonly password: string;
}