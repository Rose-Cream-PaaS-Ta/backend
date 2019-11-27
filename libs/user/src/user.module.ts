import { Module } from '@nestjs/common';
import { AwardeeModule } from './awardee/awardee.module';
import { OrganizationModule } from './organization/organization.module';
import { UserService } from './user.service';
import { ViewerModule } from './viewer/viewer.module';

@Module({
  exports: [UserService],
  imports: [AwardeeModule, ViewerModule, OrganizationModule],
  providers: [UserService],
})
export class UserModule {
}
