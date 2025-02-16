import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from 'src/dto/login.dto';
import { Request, Response } from 'express';
import { RolesGuard } from 'src/guard/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { userRole } from 'src/enum/enum';
import { Roles } from 'src/guard/roles';
import { profileDto } from './profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Post('login')
  async login(@Body() payload:LoginDto, @Req()req:Request, @Res()res:Response){
    const token = await this.userService.login(payload, res);
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Res()
  res:Response){
    return await this.userService.logout(res)
  }

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(userRole.member, userRole.manager)
  findAll(){
    return this.userService.getAllUsers()
  }

  @Post('profile')
  @UseGuards(AuthGuard())
  createProfile(@Body() payload: profileDto, @Req() req:Request) {
    return this.userService.createProfile(payload, req);
  }
}
