import { User } from '../../user/entities/user.entity';

export class PayloadSignInDto {
  id: string;
  userType: string;

  constructor(user: User) {
    this.id = user.id;
    this.userType = user.userType;
  }
}
