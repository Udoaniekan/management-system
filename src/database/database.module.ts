import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { Profile } from 'src/entity/userProfile.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Module({
     imports:[
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        entities:[User, Product, Profile, Comment],
        synchronize: true,
      }),
      inject: [ConfigService],
    }), 
  ],
    
})
export class DatabaseModule {}

