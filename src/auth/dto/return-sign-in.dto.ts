import { ReturnUserDto } from 'src/user/dto/return-user.dto';

export class ReturnSignInDto {
  accessToken: string;
  user: ReturnUserDto;
}
