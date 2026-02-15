import { Module } from '@nestjs/common';
import { CampersController } from './campers/campers.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CampersController],
  providers: [],
})
export class AppModule {}
