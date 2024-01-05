import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserNotFoundError } from 'src/errors/user-not-found.error';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const passwordHashed = await hash(createUserDto.password, saltOrRounds);

    const user: User = {
      id: uuidv4(),
      ...createUserDto,
      password: passwordHashed,
    };

    return this.prismaService.user.create({
      data: user,
    });
  }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prismaService.user.delete({ where: { id } });
    } catch (error) {
      throw new UserNotFoundError('User Not Found');
    }
  }
}
