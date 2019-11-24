import { MongoModule } from '@app/mongo';
import { Module } from '@nestjs/common';
import { ViewerService } from './viewer.service';

@Module({
  exports: [ViewerService],
  imports: [MongoModule],
  providers: [ViewerService],
})
export class ViewerModule {
}
