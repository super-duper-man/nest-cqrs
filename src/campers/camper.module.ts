import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CampersController } from "./campers.controller";
import { CamperEntityRepository } from "./db/camper-entity.repository";
import { CamperSchemaFactory } from "./db/camper-schema.factory";
import { CamperFactory } from "./camper.factory";
import { CommandHandlers } from "./commands";
import { EventHandlers } from "./events";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { CamperSchema } from "./db/camper.schema";

@Module({
    imports: [CqrsModule, MongooseModule.forFeature([{ name: CamperSchema.name, schema: SchemaFactory.createForClass(CamperSchema) }])],
    controllers: [CampersController],
    providers: [
        CamperEntityRepository,
        CamperSchemaFactory,
        CamperFactory,
        ...CommandHandlers,
        ...EventHandlers,
    ],
})
export class CamperModule {}