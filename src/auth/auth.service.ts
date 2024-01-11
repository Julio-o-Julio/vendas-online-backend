import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { compareSync } from 'bcrypt';
import { EmailOrPasswordInvalidError } from 'src/errors/email-or-password-invalid.error';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(signInDto: SignInDto): Promise<User> {
    const user: User = await this.userService.findOneByEmail(signInDto.email);

    const isMatch = compareSync(signInDto.password, user.password);

    if (!isMatch) {
      throw new EmailOrPasswordInvalidError('User Or Password Invalid');
    }

    return user;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
