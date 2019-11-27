import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Organization } from './classes/organization.class';
import { OrganizationService } from './organization.service';

@ApiUseTags('Organization')
@Controller('api/organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {
  }

  @Get()
  public root(): Promise<Organization[]> {
    return this.organizationService.getOrganization({});
  }
}
