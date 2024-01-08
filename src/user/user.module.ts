import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CachedModule } from 'src/cached/cached.module';

@Module({
  imports: [CachedModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
