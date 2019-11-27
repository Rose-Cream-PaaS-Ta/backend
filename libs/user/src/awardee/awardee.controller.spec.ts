import { MongoModule } from '@app/mongo';
import { Test, TestingModule } from '@nestjs/testing';
import { AwardeeController } from './awardee.controller';
import { AwardeeService } from './awardee.service';

describe('Awardee Controller', () => {
  let controller: AwardeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwardeeController],
      imports: [MongoModule],
      providers: [AwardeeService],
    }).compile();

    controller = module.get<AwardeeController>(AwardeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
