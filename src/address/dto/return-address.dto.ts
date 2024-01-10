import { Address } from '../entities/address.entity';

export class ReturnAddressDto {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement?: string;
  referencePoint?: string;

  constructor(address: Address) {
    this.cep = address.cep;
    this.state = address.state;
    this.city = address.city;
    this.neighborhood = address.neighborhood;
    this.street = address.street;
    this.number = address.number;
    this.complement = address.complement;
    this.referencePoint = address.referencePoint;
  }
}
