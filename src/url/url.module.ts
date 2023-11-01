import { Module } from '@nestjs/common';
import { URLService } from './url.service';
import { URLController } from './url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { URL, URLSchema } from './url.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: URL.name, schema: URLSchema }])],
  controllers: [URLController],
  providers: [URLService],
})
export class UrlModule {}
