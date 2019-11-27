import { MongoModule } from '@app/mongo';
import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  controllers: [OrganizationController],
  imports: [MongoModule],
  providers: [OrganizationService],
})
export class OrganizationModule {
}
