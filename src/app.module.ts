import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
