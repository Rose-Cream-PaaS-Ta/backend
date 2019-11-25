import { ConfigModule } from '@app/config';
import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as axios from 'axios';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [MessageService, HttpService, {
        provide: 'AXIOS_INSTANCE_TOKEN',
        useValue: axios.default.create(),
      }],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  if (process.env.GITHUB_ACTIONS) {
    it('should send message', async () => {
      await expect(service.send('01030256290', `This is Test Message sent at ${new Date().toDateString()}`)).resolves.toBeTruthy();
    });
  }
});
