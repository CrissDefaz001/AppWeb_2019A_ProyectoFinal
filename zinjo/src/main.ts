import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  await app.listen(3000);

  app.setViewEngine("ejs");
  app.setBaseViewsDir(join(__dirname,'..','views'));

}
// noinspection JSIgnoredPromiseFromCall
bootstrap();
