import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";


export class CreateProductDto {
    
    @IsString()
    @MinLength(3)
    name: string;

    @IsPositive()
    @IsNumber()
    price: number;
}
