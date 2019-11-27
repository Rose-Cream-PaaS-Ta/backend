import { MongoService, WithId } from '@app/mongo';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Collection, FilterQuery } from 'mongodb';
import { IOrganization } from './interfaces/organization.interface';

@Injectable()
export class OrganizationService {
  private organizations: Collection<IOrganization>;

  constructor(database: MongoService) {
    this.organizations = database.collection('organizations');
  }

  public async getOrganization(filter: FilterQuery<WithId<IOrganization>>): Promise<WithId<IOrganization>> {
    const query = this.organizations.find(filter);
    if (await query.count() !== 1) {
      throw new NotFoundException('Organization Not Found');
    }
    return (await query.next()) as unknown as WithId<IOrganization>;
  }
}
