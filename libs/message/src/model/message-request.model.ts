import { Type } from 'class-transformer';
import { IsEnum, IsNumberString, IsOptional, IsString, Matches, ValidateNested } from 'class-validator';
import { ContentType } from '../enum/content-type.enum';
import { MessageType } from '../enum/message-type.enum';
import { FileModel } from './file.model';
import { MessageModel } from './message.model';

export class MessageRequestModel {
  @IsEnum(MessageType)
  public type: MessageType;

  @IsOptional()
  @IsString()
  public countryCode?: string;

  @IsNumberString()
  public from: string;

  @IsOptional()
  @IsString()
  public subject?: string;

  @IsEnum(ContentType)
  public contentType: ContentType;

  @IsString()
  public content: string;

  @IsOptional()
  @IsString()
  @Matches(/^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])/)
  public reserveTime?: string;

  @IsOptional()
  @IsString()
  public reserveTimeZone?: string;

  @IsOptional()
  @IsString()
  public scheduleCode?: string;

  @ValidateNested()
  @Type(() => MessageModel)
  public messages: MessageModel[];

  @IsOptional()
  @ValidateNested()
  @Type(() => FileModel)
  public files?: FileModel[];

  constructor(message: MessageRequestModel) {
    Object.assign(this, message);
  }
}
