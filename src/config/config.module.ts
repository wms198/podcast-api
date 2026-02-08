import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService] // 1. after: nest g s config  2. Add this line: make sure that episode module imports the config module(episodes.module.ts),
})
export class ConfigModule {}
