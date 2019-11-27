import { config } from '@app/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  if (config.NODE_ENV === 'development') {
    const options = new DocumentBuilder()
      .setTitle('PaaS-Ta')
      .setDescription('PaaS-Ta API')
      .setVersion(process.env.npm_package_version)
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(config.PORT, config.HOST);
};

bootstrap().then();
