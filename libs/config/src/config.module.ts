import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { ConfigService } from './config.service';

@Module({
  exports: [ConfigService],
  providers: [{
    provide: ConfigService,
    useValue: new ConfigService(resolve(process.cwd(), '.env')),
  }],
})
export class ConfigModule {
}
