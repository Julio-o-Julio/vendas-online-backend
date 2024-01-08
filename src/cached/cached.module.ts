import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CachedService } from './cached.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 1000 * 60 * 2, // sec milisec min (fica em cache durante 2 min)
      max: 10, // máximo de itens em cache
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [CachedService],
  exports: [CachedService],
})
export class CachedModule {}
