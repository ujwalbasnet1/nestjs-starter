import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    fullName: string;

    @IsNumber()
    age: number;
}