import { MongoModule, MongoService } from '@app/mongo';
import { Test, TestingModule } from '@nestjs/testing';
import { ViewerService } from './viewer.service';

describe('ViewerService', () => {
  let mongo: MongoService;
  let service: ViewerService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongoModule],
      providers: [ViewerService],
    }).compile();

    mongo = module.get<MongoService>(MongoService);
    service = module.get<ViewerService>(ViewerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await mongo.close();
  });
});
