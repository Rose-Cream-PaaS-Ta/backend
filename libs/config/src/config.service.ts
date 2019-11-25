import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';
import { INcpAuth } from './interfaces/ncp-auth.interface';

type config = Record<string, string>;

@Injectable()
export class ConfigService {
  private readonly env: config;

  constructor(path?: string, conf?: config) {
    this.env = ConfigService.validateInput({
      ...path && fileExistsSync(path) && parse(readFileSync(path)),
      ...process.env,
      ...conf,
    });
  }

  public get NODE_ENV(): string {
    return this.env.NODE_ENV;
  }

  public get HOST(): string {
    return this.env.HOST;
  }

  public get PORT(): string {
    return this.env.PORT;
  }

  public get MONGODB_URI(): string {
    return this.env.MONGODB_URI;
  }

  public get NCP_KEY(): string {
    return this.env.NCP_KEY;
  }

  public get NCP_SECRET(): string {
    return this.env.NCP_SECRET;
  }

  public get NCP_SMS_ID(): string {
    return this.env.NCP_SMS_ID;
  }

  public get NCP_SMS_SECRET(): string {
    return this.env.NCP_SMS_SECRET;
  }

  public get NCP_SMS_SENDER(): string {
    return this.env.NCP_SMS_SENDER;
  }

  public get NCP_AUTH(): INcpAuth {
    return {
      NCP_KEY: this.NCP_KEY,
      NCP_SECRET: this.NCP_SECRET,
      NCP_SMS_ID: this.NCP_SMS_ID,
      NCP_SMS_SECRET: this.NCP_SMS_SECRET,
      NCP_SMS_SENDER: this.NCP_SMS_SENDER,
    };
  }

  private static validateInput(envConfig: config): config {
    const environmentVariablesScheme: Joi.ObjectSchema = Joi.object({
      HOST: Joi.string().hostname().default('0.0.0.0'),
      MONGODB_URI: Joi.string().regex(/^mongodb:\/\/.+\/[a-z-]+$/).required(),
      NCP_KEY: Joi.string().required(),
      NCP_SECRET: Joi.string().required(),
      NCP_SMS_ID: Joi.string().required(),
      NCP_SMS_SECRET: Joi.string().required(),
      NCP_SMS_SENDER: Joi.string().required(),
      NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
      PORT: Joi.number().default(3000),
    }).unknown(true);

    const { error, value: validatedEnvConfig } = environmentVariablesScheme.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}

export const config = new ConfigService(resolve(process.cwd(), '.env'));
