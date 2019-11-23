import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';

type config = Record<string, string>;

@Injectable()
export class ConfigService {
  private readonly env: config;

  constructor(path?: string) {
    this.env = ConfigService.validateInput({
      ...path && fileExistsSync(path) && parse(readFileSync(path)),
      ...process.env,
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

  private static validateInput(envConfig: config): config {
    const environmentVariablesScheme: Joi.ObjectSchema = Joi.object({
      HOST: Joi.string().hostname().default('0.0.0.0'),
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
