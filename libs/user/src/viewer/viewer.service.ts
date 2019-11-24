import { MongoService } from '@app/mongo';
import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';

@Injectable()
export class ViewerService {
  private readonly viewerCollection: Collection;

  constructor(database: MongoService) {
    this.viewerCollection = database.collection('viewer');
  }
}
