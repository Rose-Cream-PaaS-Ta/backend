import { Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';

@Injectable()
export class MongoService extends MongoClient {
  constructor(uri: string) {
    super(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public async connect(): Promise<MongoService> {
    await super.connect();
    return this;
  }

  public async close(): Promise<void> {
    await super.close();
  }

  public collection<T>(name: string): Collection<T> {
    return this.db().collection(name);
  }
}
