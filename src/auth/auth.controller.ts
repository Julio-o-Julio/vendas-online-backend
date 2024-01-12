import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ReturnSignInDto } from './dto/return-sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post()
  async signIn(@Body() signInDto: SignInDto): Promise<ReturnSignInDto> {
    return await this.authService.signIn(signInDto);
  }

  @Post('/signout')
  findAll() {
    return this.authService.signOut();
  }
}
