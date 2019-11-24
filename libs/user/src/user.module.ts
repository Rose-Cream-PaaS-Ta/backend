import { Module } from '@nestjs/common';
import { AwardeeModule } from './awardee/awardee.module';
import { AwarderModule } from './awarder/awarder.module';
import { UserService } from './user.service';
import { ViewerModule } from './viewer/viewer.module';

@Module({
  exports: [UserService],
  imports: [AwarderModule, AwardeeModule, ViewerModule],
  providers: [UserService],
})
export class UserModule {
}
