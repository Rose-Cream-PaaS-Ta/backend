import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { OrganizationService } from './organization.service';

@ApiUseTags('Organization')
@Controller('api/organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {
  }

  @Get()
  public root() {
    return this.organizationService.getOrganization({});
  }
}
