import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import figlet from 'figlet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:4200' });
  const config = new DocumentBuilder()
    .setTitle('File Upload System Api')
    .setDescription('NestJS backend')
    .setVersion('1.0')
    .addTag('files')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //figlet implementation
  figlet('File Uploader API', (err, data) => {
    if (!err) console.log(data);
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
