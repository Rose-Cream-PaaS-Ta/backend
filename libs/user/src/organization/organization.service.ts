import { MongoService, WithId } from '@app/mongo';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Collection, FilterQuery } from 'mongodb';
import { Organization } from './classes/organization.class';
import { IOrganization } from './interfaces/organization.interface';

@Injectable()
export class OrganizationService {
  private organizations: Collection<IOrganization>;

  constructor(database: MongoService) {
    this.organizations = database.collection('organizations');
  }

  public async getOrganization(filter: FilterQuery<WithId<IOrganization>>): Promise<Array<WithId<Organization>>> {
    const query = this.organizations.find(filter);
    if (await query.count() !== 1) {
      throw new NotFoundException('Organization Not Found');
    }
    return (await query.map((i) => new Organization(i)).toArray()) as unknown as Array<WithId<Organization>>;
  }
}
