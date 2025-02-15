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

  async create(payload: CreateCommentDto, user: User, productId: number) {
    console.log(user);

    // Find the product inside the service
    const product = await this.productRepo.findOneBy({ id: productId });
    if (!product) {
        throw new HttpException('Product not found', 404);
    }

    // Create a new comment instance
    const newComment = new Comment();
    newComment.userId = user.id;
    newComment.product = product; // Link product automatically
    Object.assign(newComment, payload);

    return await this.productComment.save(newComment);
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
