import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product} from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private userProduct:Repository<Product>){}
  async create(payload: CreateProductDto, user:User) {
    const findUser=user
    console.log(findUser)
    const newProduct = new Product();
    newProduct.userId = user.id; 
    Object.assign(newProduct, payload)
    return this.userProduct.save(newProduct)
  } 
 
 async findAll() {
    return await this.userProduct.find()
  }

  async findOne(id: number) {
    const find1 = await this.userProduct.findOne({where:{id:id}});
    if(!find1) throw new HttpException('sorry id not found', 400);
    return find1
  }


  async update(id: number, payload: UpdateProductDto) {
    const find1st = await this.userProduct.findOne({where:{id:id}});
    if(!find1st) throw new HttpException('sorry, incorrect id', 400);
    const updateProduct = await this.userProduct.update(id, payload);
    return{
      statusCode: 201,
      message: 'product updated successfully',
      updateProduct
    }
  }

  async remove(id: number) {
    const find = await this.userProduct.findOne({where:{id:id}});
    if (!find) throw new HttpException('sorry, no such product found', 400);
    await this.userProduct.delete(id);
    return{
      statusCode:200,
      message:`${find.name} was deleted successfully`
    }
  }
}
