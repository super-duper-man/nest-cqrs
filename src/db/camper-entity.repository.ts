import { CamperSchema } from "./camper.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Camper } from "src/campers/Camper";
import { BaseEntityRepository } from "src/database/base-entity.repository";
import { CamperSchemaFactory } from "./camper-schema.factory";

@Injectable()
export class CamperEntityRepository extends BaseEntityRepository<CamperSchema, Camper> {

    constructor(
        @InjectModel(CamperSchema.name) camperModel: Model<CamperSchema>,
        camperSchemaFactory: CamperSchemaFactory
    ) {
        super(camperModel, camperSchemaFactory);
    }
}