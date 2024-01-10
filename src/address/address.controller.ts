import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
    const address = await this.addressService.create(createAddressDto, userId);
    return new ReturnAddressDto(address);
  }

  @Get('/:userId')
  async findAll(@Param('userId') userId: string): Promise<ReturnAddressDto[]> {
    const addresses = await this.addressService.findAll(userId);
    return addresses.map((address: Address) => new ReturnAddressDto(address));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
