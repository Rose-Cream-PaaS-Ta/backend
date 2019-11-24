import { MongoModule, MongoService } from '@app/mongo';
import { Test, TestingModule } from '@nestjs/testing';
import { AwardeeService } from './awardee.service';

describe('AwardeeService', () => {
  let mongo: MongoService;
  let service: AwardeeService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongoModule],
      providers: [AwardeeService],
    }).compile();

    mongo = module.get<MongoService>(MongoService);
    service = module.get<AwardeeService>(AwardeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await mongo.close();
  });
});
