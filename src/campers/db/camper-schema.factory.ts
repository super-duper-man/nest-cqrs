import { Injectable } from "@nestjs/common";
import { EntitySchemaFactory } from "src/database/entity-schema.factory";
import { CamperSchema } from "./camper.schema";
import { Camper } from "src/campers/Camper";
import { ObjectId } from "mongodb";

@Injectable()
export class CamperSchemaFactory implements EntitySchemaFactory<CamperSchema, Camper> {
    create(entity: Camper): CamperSchema {
        return {
            _id: new ObjectId(entity.getId()),
            age: entity.getAge(),
            name: entity.getName(),
            allergies: entity.getAllergies(),
        }
    }
    createFromSchema(entitySchema: CamperSchema): Camper {
        return new Camper(
            entitySchema._id.toHexString(),
            entitySchema.name,
            entitySchema.age,
            entitySchema.allergies,
        );
    }

}