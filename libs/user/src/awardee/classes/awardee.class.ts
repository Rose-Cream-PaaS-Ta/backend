import { Gender } from '../enums/gender.enum';
import { IAwardee } from '../interfaces/awardee.interface';

export class Awardee implements IAwardee {
  public birth: Date;
  public gender: Gender;
  public mail: string;
  public name: string;
  public password: Buffer;
  public phone: number;
  public username: string;

  constructor(awardee: IAwardee) {
    Object.assign(this, awardee);
  }
}
