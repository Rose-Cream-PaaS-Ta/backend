import { Test, TestingModule } from '@nestjs/testing';
import { AwardeeController } from './awardee.controller';

describe('Awardee Controller', () => {
  let controller: AwardeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwardeeController],
    }).compile();

    controller = module.get<AwardeeController>(AwardeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
