import { User } from 'src/user/entities/user.entity';

export class Address {
  id: number;
  userId: string;
  user?: User;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement?: string;
  referencePoint?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
