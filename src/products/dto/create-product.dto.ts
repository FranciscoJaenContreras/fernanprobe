import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    image: string;

    @IsString()
    idUser: string;

    @IsOptional()
    vendido: boolean;

    @IsString()
    category: string;

    @IsOptional()
    @IsString()
    sellTo: string;
}
