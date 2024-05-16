import { Address } from '../../address/entities/address.entity';

export class User {
  id: string;
  name: string;
  email: string;
  userType?: string;
  phone?: string;
  cpf: string;
  password: string;
  address?: Address[];
  createdAt?: Date;
  updatedAt?: Date;
}
