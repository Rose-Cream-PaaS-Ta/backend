import { IOrganization } from '../interfaces/organization.interface';

export class Organization implements IOrganization {
  public homepage: string;
  public mail: string;
  public name: string;
  public password: Buffer;
  public phone: number;
  public username: string;

  constructor(org: IOrganization) {
    Object.assign(this, org);
  }
}
