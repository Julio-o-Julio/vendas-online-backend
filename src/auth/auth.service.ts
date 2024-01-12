import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { compareSync } from 'bcrypt';
import { EmailOrPasswordInvalidError } from 'src/errors/email-or-password-invalid.error';
import { ReturnSignInDto } from './dto/return-sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDto } from 'src/user/dto/return-user.dto';
import { PayloadSignInDto } from './dto/payload-sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<ReturnSignInDto> {
    const user: User = await this.userService.findOneByEmail(signInDto.email);

    const isMatch = compareSync(signInDto.password, user.password);

    if (!isMatch) {
      throw new EmailOrPasswordInvalidError('User Or Password Invalid');
    }

    return {
      accessToken: this.jwtService.sign({ ...new PayloadSignInDto(user) }),
      user: new ReturnUserDto(user),
    };
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
