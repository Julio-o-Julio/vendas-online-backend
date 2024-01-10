import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { Address } from './entities/address.entity';
import { CachedService } from 'src/cached/cached.service';

@Injectable()
export class AddressService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly cachedService: CachedService,
  ) {}

  async create(
    createAddressDto: CreateAddressDto,
    userId: string,
  ): Promise<Address> {
    await this.userService.findOne(userId);

    const address = await this.prismaService.address.create({
      data: { userId, ...createAddressDto },
    });

    await this.cachedService.clearCached(userId);

    return address;
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

    const addressUpdated = await this.prismaService.address.update({
      where: {
        userId_id: {
          userId,
          id,
        },
      },
      data: updateAddressDto,
    });

    await this.cachedService.clearCached(userId);

    return addressUpdated;
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

    await this.cachedService.clearCached(userId);
  }
}
