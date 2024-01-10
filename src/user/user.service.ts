import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from 'src/errors/not-found.error';
import { CachedService } from 'src/cached/cached.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cachedService: CachedService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const passwordHashed = await hash(createUserDto.password, saltOrRounds);

    const user: User = await this.prismaService.user.create({
      data: {
        id: uuidv4(),
        ...createUserDto,
        password: passwordHashed,
        address: undefined,
      },
      include: { address: true },
    });

    await this.cachedService.clearCached(user.id);

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.cachedService.getCached<User>(id, () =>
        this.prismaService.user.findUniqueOrThrow({
          where: { id },
          include: { address: true },
        }),
      );
    } catch (error) {
      throw new NotFoundError('User Not Found');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const userUpdated = await this.prismaService.user.update({
        where: { id },
        data: updateUserDto,
      });

      await this.cachedService.clearCached(id);

      return userUpdated;
    } catch (error) {
      throw new NotFoundError('User Not Found');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prismaService.user.delete({ where: { id } });

      await this.cachedService.clearCached(id);
    } catch (error) {
      throw new NotFoundError('User Not Found');
    }
  }
}
