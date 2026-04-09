import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class SignUpDto{
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    fullName!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password!: string;
}