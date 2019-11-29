import { MongoModule, MongoService } from '@app/mongo';
import { Test, TestingModule } from '@nestjs/testing';
import { AwardeeController } from './awardee.controller';
import { AwardeeService } from './awardee.service';

describe('Awardee Controller', () => {
  let controller: AwardeeController;
  let client: MongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwardeeController],
      imports: [MongoModule],
      providers: [AwardeeService],
    }).compile();

    controller = module.get<AwardeeController>(AwardeeController);
    client = module.get<MongoService>(MongoService);
  });

  afterEach(async () => {
    await client.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
