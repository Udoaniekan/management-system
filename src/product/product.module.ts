import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { User } from 'src/entity/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product,User]),UserModule,
    ProductModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
