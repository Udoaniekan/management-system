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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LoginDto } from 'src/dto/login.dto';
import { Request, Response } from 'express';
import { RolesGuard } from 'src/guard/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { userRole } from 'src/enum/enum';
import { Roles } from 'src/guard/roles';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Post('login')
  async login(@Body() payload:LoginDto, @Req()req:Request, @Res()res:Response){
    const token = await this.userService.login(payload, res);
  }

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(userRole.member, userRole.manager)
  findAll(){
    return this.userService.getAllUsers()
  }
}
