import { MongoModule } from '@app/mongo';
import { Module } from '@nestjs/common';
import { AwardeeService } from './awardee.service';

@Module({
  exports: [AwardeeService],
  imports: [MongoModule],
  providers: [AwardeeService],
})
export class AwardeeModule {
}
