import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class loginDTO{
    @IsNotEmpty()
    @ApiProperty()
    readonly username: string;
    @IsNotEmpty()
    @MinLength(8,{message: 'Password must be at least 8 characters'})
    @ApiProperty()
    readonly password: string;
}