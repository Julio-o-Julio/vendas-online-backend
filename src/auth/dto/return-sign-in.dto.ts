import { ReturnUserDto } from '../../user/dto/return-user.dto';

export class ReturnSignInDto {
  accessToken: string;
  user: ReturnUserDto;
}
