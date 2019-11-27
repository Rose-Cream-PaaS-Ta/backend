import { Gender } from '../enums/gender.enum';

export interface IAwardee {
  name: string;
  gender: Gender;
  birth: Date;
  mail: string;
  phone: number;
  username: string;
  password: Buffer;
}
