import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class UpdateProductDto {
    @IsString()
    name?: string;
}
