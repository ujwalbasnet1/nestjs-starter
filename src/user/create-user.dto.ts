import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';


export class CreateUserDto {
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNumber()
    age: number;
}