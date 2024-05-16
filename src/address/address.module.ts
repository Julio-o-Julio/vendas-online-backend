import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { UserModule } from '../user/user.module';
import { CachedModule } from '../cached/cached.module';

@Module({
  imports: [UserModule, CachedModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
