
import { BadRequestException, HttpException, HttpStatus, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt'
import { LoginDto } from 'src/dto/login.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'src/entity/userProfile.entity';
import { profileDto } from './profile.dto';

@Injectable()
export class UserService {
constructor(@InjectRepository(User) private userRepo:Repository<User>,@InjectRepository(Profile) private profileRepo:Repository<Profile>,
private readonly jwtService:JwtService)
{}
async signUp(payload: CreateUserDto){
  payload.email = payload.email.toLowerCase();
  const {email, password, ...rest} = payload;
  const isUser = await this.userRepo.findOne({where:{email}});
  if(isUser) throw new HttpException('sorry user with this email already exist', 400); 

  const hashPassword = await  bcrypt.hash(password, 5);

  try {
    const  user = await this.userRepo.save({email, password: hashPassword, ...rest});
    delete user.password;
    return user;
  } catch (error)
{
  if(error.code === '22P02'){
    throw new BadRequestException('admin role should be lowercase')
  }
  return error
}
}

async login(payload:LoginDto,@Res()res:Response){
  const{email, password} =payload;
  const user = await this.userRepo.createQueryBuilder("user")
  .addSelect("user.password")
  .where("user.email = :email", {email:payload.email}).getOne()
  if(!user) throw new HttpException('invalid credentials', 404);
  
  const Ismatch = await bcrypt.compare(password, user.password);
  if(!Ismatch){
    throw new HttpException('invalid credentials', 404);
  }

  const token = await this.jwtService.signAsync({id:user.id, email:user.email,
    role:user.role});

  res.cookie('userAuthentication', token, {
    httpOnly:true,
    maxAge: 1 * 60 * 60 * 1000,
    sameSite: 'none',
    secure: true
  }),
  delete user.password;
  return res.send({
    message: 'User login successful',
    userToken: token,
    userDetails: user

  })
}

async logout(@Req() req:Request, @Res()res:Response){
  const clearCookie = res.clearCookie('userAuthentication');

  const response = res.send(`user successfully logout`)

  return{
    clearCookie,
    response
  }
}

async user(headers:any): Promise<any>{
  const authorizationHeader = headers.authorization;
  if (authorizationHeader){
    const token = authorizationHeader.replace('Bearer','').trim();
    const secret = process.env.JWT_SECRET;
    try{
      const decoded = this.jwtService.verify(token);
      let id = decoded['id'];
      let user = await this.userRepo.findOneBy({id});

      return {id:id, name: user.username, email:user.email, role:user.role};
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  } else {
    throw new UnauthorizedException('Invalid or missing Bearer token');
  }
}

async findEmail(email:string){
  const user = await this.userRepo.findOneBy({email:email});

  if(!user){
    throw new UnauthorizedException();
  }else{
    return user;
  }
}

async getAllUsers(){
  return await this.userRepo.find()
}
async createProfile(payload:profileDto , @Req() req:Request){
  const user= req?.user;
  // if(!user){
  //   throw new HttpException(`user not found`, HttpStatus.NOT_FOUND)
  // } 
  const id = user['id'] 

  const findUser = await this.userRepo.findOne({where:{id:id}});

  if(!findUser){
    throw new HttpException(`no user was found`, HttpStatus.NOT_FOUND)
  }
  try{
    const userProfile = this.profileRepo.create({
      ...payload,
      user
    });

    const saveProfile = await this.profileRepo.save(userProfile);
    return saveProfile
  }catch(error){
    return error
  }
}

}

