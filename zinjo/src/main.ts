import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

const FileStore = require('session-file-store')(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;

  app.use(cookieParser('Mi secreto'));
  app.use(
    session({
      name: 'server-session-id',
      secret: 'Mi secreto',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
      },
      store: new FileStore({
        logFn: function() {
        },
      }),
    }),
  );
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  await app.listen(3000);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
