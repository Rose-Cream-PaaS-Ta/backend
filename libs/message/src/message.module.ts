import { ConfigModule } from '@app/config';
import { HttpService, Module } from '@nestjs/common';
import { MessageService } from './message.service';

@Module({
  exports: [MessageService],
  imports: [ConfigModule],
  providers: [MessageService, HttpService],
})
export class MessageModule {
}
