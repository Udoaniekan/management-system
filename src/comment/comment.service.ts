import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/entity/user.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private productComment:Repository<Comment>, @InjectRepository(Product) private productRepo:Repository<Product>){}

  async create(payload: CreateCommentDto, user:User, productId:number) {
    console.log(user)
    const newComment = new Comment();
    newComment.userId = user.id;
    Object.assign(newComment, payload)
    const findProduct= await this.productRepo.findOne({where:{id:1}});
    if(!findProduct) throw new HttpException('sorry product not found', 400);
    const j = await this.productComment.save(newComment)
    if (!findProduct.comment) {
      findProduct.comment = [];
      console.log(j); 
    }
    const m = findProduct.comment.push(j)
    console.log(m); 
    
    await this.productRepo.save(findProduct)
    return j


  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
