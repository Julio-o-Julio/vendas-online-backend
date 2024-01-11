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
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ReturnAddressDto } from './dto/return-address.dto';
import { Address } from './entities/address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('/:userId')
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @Param('userId') userId: string,
  ): Promise<ReturnAddressDto> {
    return new ReturnAddressDto(
      await this.addressService.create(createAddressDto, userId),
    );
  }

  @Get('/:userId')
  async findAll(@Param('userId') userId: string): Promise<ReturnAddressDto[]> {
    const addresses = await this.addressService.findAll(userId);
    return addresses.map((address: Address) => new ReturnAddressDto(address));
  }

  @Get('/:userId/:id')
  async findOne(
    @Param('userId') userId: string,
    @Param('id') id: string,
  ): Promise<ReturnAddressDto> {
    return new ReturnAddressDto(await this.addressService.findOne(+id, userId));
  }

  @Patch('/:userId/:id')
  async update(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<ReturnAddressDto> {
    return new ReturnAddressDto(
      await this.addressService.update(+id, updateAddressDto, userId),
    );
  }

  @HttpCode(204) // no content
  @Delete('/:userId/:id')
  async remove(
    @Param('userId') userId: string,
    @Param('id') id: string,
  ): Promise<void> {
    return await this.addressService.remove(+id, userId);
  }
}
