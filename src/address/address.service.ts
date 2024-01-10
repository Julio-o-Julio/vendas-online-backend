import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(
    createAddressDto: CreateAddressDto,
    userId: string,
  ): Promise<Address> {
    await this.userService.findOne(userId);

    return await this.prismaService.address.create({
      data: { userId, ...createAddressDto },
    });
  }

  async findAll(userId: string): Promise<Address[]> {
    await this.userService.findOne(userId);

    return await this.prismaService.address.findMany({ where: { userId } });
  }

  async findOne(id: number, userId: string): Promise<Address> {
    await this.userService.findOne(userId);

    return await this.prismaService.address.findUniqueOrThrow({
      where: {
        userId_id: {
          userId,
          id,
        },
      },
    });
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
    userId: string,
  ): Promise<Address> {
    await this.userService.findOne(userId);

    return await this.prismaService.address.update({
      where: {
        userId_id: {
          userId,
          id,
        },
      },
      data: updateAddressDto,
    });
  }

  async remove(id: number, userId: string): Promise<void> {
    await this.userService.findOne(userId);

    await this.prismaService.address.delete({
      where: {
        userId_id: {
          userId,
          id,
        },
      },
    });
  }
}
