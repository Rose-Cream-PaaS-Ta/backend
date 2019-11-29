import { MongoModule, MongoService } from '@app/mongo';
import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationService } from './organization.service';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let client: MongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongoModule],
      providers: [OrganizationService],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
    client = module.get<MongoService>(MongoService);
  });

  afterEach(async () => {
    await client.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
