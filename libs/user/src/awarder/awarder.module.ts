import { MongoModule } from '@app/mongo';
import { Module } from '@nestjs/common';
import { AwarderService } from './awarder.service';

@Module({
  exports: [AwarderService],
  imports: [MongoModule],
  providers: [AwarderService],
})
export class AwarderModule {
}
