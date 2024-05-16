import { ReturnAddressDto } from '../../address/dto/return-address.dto';
import { Address } from '../../address/entities/address.entity';
import { User } from '../entities/user.entity';

export class ReturnUserDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address?: ReturnAddressDto[];

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.cpf = user.cpf;
    this.address = user.address
      ? user.address.map((address: Address) => new ReturnAddressDto(address))
      : undefined;
  }
}
