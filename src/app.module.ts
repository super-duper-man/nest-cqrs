import { Module } from '@nestjs/common';
import { CampersController } from './campers/campers.controller';
import { DatabaseModule } from './database/database.module';
import { CamperModule } from './campers/camper.module';

@Module({
  imports: [CamperModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
