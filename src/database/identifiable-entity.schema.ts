import { Prop } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";

export abstract class IdentifiableEntity {
    @Prop()
    readonly _id!: ObjectId;
}