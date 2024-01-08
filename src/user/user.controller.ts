import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const user = await this.userService.create(createUserDto);
    return new ReturnUserDto(user);
  }

  @Get()
  async findAll(): Promise<ReturnUserDto[]> {
    const users = await this.userService.findAll();
    return users.map((user: User) => new ReturnUserDto(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnUserDto> {
    const user = await this.userService.findOne(id);
    return new ReturnUserDto(user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.userService.update(id, updateUserDto);
    return new ReturnUserDto(user);
  }

  @HttpCode(204) // No content (retorna nada)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.userService.remove(id);
  }
}
