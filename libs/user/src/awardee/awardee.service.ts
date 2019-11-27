import { MongoService, WithId } from '@app/mongo';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Collection, FilterQuery } from 'mongodb';
import { Awardee } from './classes/awardee.class';
import { IAwardee } from './interfaces/awardee.interface';

@Injectable()
export class AwardeeService {
  private readonly awardeeCollection: Collection<IAwardee>;

  constructor(database: MongoService) {
    this.awardeeCollection = database.collection('awardee');
  }

  public async getAwardee(filter: FilterQuery<WithId<IAwardee>>): Promise<Array<WithId<Awardee>>> {
    const query = this.awardeeCollection.find(filter);
    if (await query.count() !== 1) {
      throw new NotFoundException('Awardee Not Found');
    }
    return (await query.map((i) => new Awardee(i)).toArray()) as Array<WithId<Awardee>>;
  }
}
