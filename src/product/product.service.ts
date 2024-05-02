import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private userProduct:Repository<Product>){}
  async create(payload: CreateProductDto) {
    const newProduct = await this.userProduct.create(payload)
    return this.userProduct.save(newProduct)
  }

 async findAll() {
    return await this.userProduct.find()
  }

  async findOne(id: string) {
    const find1 = await this.userProduct.findOne({where:{id:id}});
    if(!find1) throw new HttpException('sorry id not found', 400);
    return find1
  }


  async update(id: string, payload: UpdateProductDto) {
    const find1st = await this.userProduct.findOne({where:{id:id}});
    if(!find1st) throw new HttpException('sorry, incorrect id', 400);
    const updateProduct = await this.userProduct.update(id, payload);
    return{
      statusCode: 201,
      message: 'product updated successfully',
      updateProduct
    }


  }

  async remove(id: string) {
    const find = await this.userProduct.findOne({where:{id:id}});
    if (!find) throw new HttpException('sorry, no such product found', 400);
    await this.userProduct.delete(id);
    return{
      statusCode:200,
      message:`${find.name} was deleted successfully`
    }
  }
}
