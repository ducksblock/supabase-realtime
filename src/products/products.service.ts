import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './products.entity';
import { CreateProductDto } from './products.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private readonly productRepository: Repository<Products>,
    ) { }

    async create(createProductDto: CreateProductDto): Promise<Products> {
        const product = this.productRepository.create(createProductDto);
        return await this.productRepository.save(product);
    }

    async findAll(): Promise<Products[]> {
        return await this.productRepository.find();
    }

    async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
}
