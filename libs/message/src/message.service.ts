import { ConfigService } from '@app/config';
import { HttpService, Inject, Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import * as CryptoJS from 'crypto-js';
import { ContentType } from './enum/content-type.enum';
import { MessageType } from './enum/message-type.enum';
import { IMessageResult } from './interfaces/message-result.interface';
import { MessageRequestModel } from './model/message-request.model';

export enum Method {
  get = 'GET',
  post = 'POST',
}

@Injectable()
export class MessageService {
  @Inject()
  private readonly httpService: HttpService;
  private readonly config: {
    NCP_KEY: string;
    NCP_SECRET: string;
    NCP_SMS_ID: string;
    NCP_SMS_SECRET: string;
    NCP_SMS_SENDER: string;
  };

  constructor(config: ConfigService) {
    this.config = config.NCP_AUTH;
  }

  public signature(method: Method, url: string, timestamp: number): string {
    const accessKey = this.config.NCP_KEY;			// access key id (from portal or Sub Account)
    const secretKey = this.config.NCP_SECRET;			// secret key (from portal or Sub Account)

    return CryptoJS.HmacSHA256(`${method} ${url}\n${timestamp}\n${accessKey}`, secretKey).toString(CryptoJS.enc.Base64);
  }

  public async send(to: number | string, text: string) {
    const endpoint = `/sms/v2/services/${escape(this.config.NCP_SMS_ID)}/messages`;
    const timestamp = new Date().getTime();
    const sender: string = this.config.NCP_SMS_SENDER;
    return this.httpService.post<IMessageResult>(endpoint, await validateOrReject(new MessageRequestModel({
      content: text,
      contentType: ContentType.common,
      from: sender,
      messages: [{
        to: to.toString(),
      }],
      type: MessageType.sms,
    })), {
      baseURL: 'https://sens.apigw.ntruss.com',
      headers: {
        'x-ncp-apigw-signature-v2': this.signature(Method.post, endpoint, timestamp),
        'x-ncp-apigw-timestamp': timestamp.toString(),
        'x-ncp-iam-access-key': this.config.NCP_KEY,
      },
    }).toPromise();
  }
}
