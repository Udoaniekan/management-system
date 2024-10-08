import { IsNotEmpty, IsString } from "class-validator";

export class profileDto{
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
}