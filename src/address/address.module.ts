import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { UserModule } from 'src/user/user.module';
import { CachedModule } from 'src/cached/cached.module';

@Module({
  imports: [UserModule, CachedModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
