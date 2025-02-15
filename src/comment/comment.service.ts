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
    // Create a new comment instance
    const newComment = new Comment();
    newComment.userId = user.id;
    Object.assign(newComment, payload);
    // Find the product by productId
    const findProduct = await this.productRepo.findOne({
        where: { id: productId }, 
        relations: ["comments"], // Ensure comments are loaded
    });
    if (!findProduct) throw new HttpException('Sorry, product not found', 400);
    // Assign the product to the comment
    newComment.product = findProduct;
    // Save the new comment
    const savedComment = await this.productComment.save(newComment);
    // Push the new comment into the product's comments array
    findProduct.comments.push(savedComment);
    // Save the updated product
    await this.productRepo.save(findProduct);

    return savedComment;
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
