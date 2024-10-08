import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/Strategy/jwt.strategy';
import { Profile } from 'src/entity/userProfile.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Profile]),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory:(configService:ConfigService)=>({
        secret:configService.getOrThrow('JWT_SECRET'),
        signOptions:{
          algorithm:configService.getOrThrow('JWT_ALGORITHM'),
          expiresIn:configService.getOrThrow('JWT_EXPIRES_IN')
        }
      }),
      inject:[ConfigService]
    }),
    PassportModule.register({
      defaultStrategy:'jwt',
      session:true
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, UserService]
})
export class UserModule {}
