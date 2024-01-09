export class Address {
  id: number;
  userId: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement?: string;
  referencePoint?: string;
  createdAt: Date;
  updatedAt: Date;
}
