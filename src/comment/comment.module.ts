import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { Comment } from './entities/comment.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Comment, Product,User]),UserModule,
    ProductModule
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
