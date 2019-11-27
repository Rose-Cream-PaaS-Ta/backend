import { MongoModule } from '@app/mongo';
import { Module } from '@nestjs/common';
import { AwardeeController } from './awardee.controller';
import { AwardeeService } from './awardee.service';

@Module({
  controllers: [AwardeeController],
  exports: [AwardeeService],
  imports: [MongoModule],
  providers: [AwardeeService],
})
export class AwardeeModule {
}
