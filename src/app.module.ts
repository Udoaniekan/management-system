import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }), 
    DatabaseModule,
    UserModule,
    ProductModule,
    CommentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
