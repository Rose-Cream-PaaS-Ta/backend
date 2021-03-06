import { Test, TestingModule } from '@nestjs/testing';
import { config } from 'dotenv';
import { resolve } from 'path';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    config();
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: ConfigService,
        useValue: new ConfigService(resolve(process.cwd(), '.env')),
      }],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw Error when config doesn\'t matches to scheme', () => {
    expect(() => {
      return new ConfigService(null, {
        MONGODB_URI: null,
      }).MONGODB_URI;
    }).toThrow();
  });

  it('should be get config', () => {
    expect(service.HOST).toStrictEqual(process.env.HOST || '0.0.0.0');
    expect(service.NODE_ENV).toStrictEqual(process.env.NODE_ENV || 'development');
    expect(service.PORT).toStrictEqual(parseInt(process.env.PORT, 10) || 3000);
    expect((() => {
      const ncp = service.NCP_AUTH;
      console.log(JSON.stringify(ncp, null, 4));
      return ncp;
    })()).toBeTruthy();
  });
});
