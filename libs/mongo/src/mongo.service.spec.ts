import { ConfigModule, ConfigService } from '@app/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Collection } from 'mongodb';
import { MongoService } from './mongo.service';

describe('MongoService', () => {
  let service: MongoService;
  let collection: Collection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [{
        inject: [ConfigService],
        provide: MongoService,
        useFactory(config: ConfigService) {
          return new MongoService(config.MONGODB_URI).connect();
        },
      }],
    }).compile();

    service = module.get<MongoService>(MongoService);
    collection = service.collection('test');
  });

  it('should get collection', async () => {
    await expect(collection.insertOne({})).resolves.toBeTruthy();
  });

  afterAll(async () => {
    await collection.drop();
    await service.close();
  });
});
