import { IsBase64, IsString } from 'class-validator';

export class FileModel {
  @IsString()
  public name: string;
  @IsBase64()
  public body: string;
}
