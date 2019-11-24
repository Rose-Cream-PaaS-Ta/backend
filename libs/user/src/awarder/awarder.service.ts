import { MongoService } from '@app/mongo';
import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';

@Injectable()
export class AwarderService {
  private readonly awarderCollection: Collection;

  constructor(database: MongoService) {
    this.awarderCollection = database.collection('awarder');
  }
}
