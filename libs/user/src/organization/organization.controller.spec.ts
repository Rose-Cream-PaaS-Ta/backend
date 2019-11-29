import { MongoModule, MongoService } from '@app/mongo';
import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

describe('Organization Controller', () => {
  let controller: OrganizationController;
  let client: MongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationController],
      imports: [MongoModule],
      providers: [OrganizationService],
    }).compile();

    controller = module.get<OrganizationController>(OrganizationController);
    client = module.get<MongoService>(MongoService);
  });

  afterEach(async () => {
    await client.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
