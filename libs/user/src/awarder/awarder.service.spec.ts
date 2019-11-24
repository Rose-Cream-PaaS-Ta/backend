import { MongoModule, MongoService } from '@app/mongo';
import { Test, TestingModule } from '@nestjs/testing';
import { AwarderService } from './awarder.service';

describe('AwarderService', () => {
  let mongo: MongoService;
  let service: AwarderService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongoModule],
      providers: [AwarderService],
    }).compile();

    mongo = module.get<MongoService>(MongoService);
    service = module.get<AwarderService>(AwarderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await mongo.close();
  });
});
