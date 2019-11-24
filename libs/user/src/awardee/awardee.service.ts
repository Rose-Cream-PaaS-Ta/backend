import { MongoService } from '@app/mongo';
import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';

@Injectable()
export class AwardeeService {
  private readonly awardeeCollection: Collection;

  constructor(database: MongoService) {
    this.awardeeCollection = database.collection('awardee');
  }
}
