import { Prop, Schema } from "@nestjs/mongoose";
import { IdentifiableEntity } from "src/database/identifiable-entity.schema";

@Schema({versionKey: false, collection: "campers"})
export class CamperSchema extends IdentifiableEntity {
    @Prop()
    name!: string;
    @Prop()
    age!: number;
    @Prop()
    allergies!: string[];
}