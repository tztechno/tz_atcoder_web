import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 静的ファイルのルートパスを設定
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // 起動
  await app.listen(3000);
}
bootstrap();