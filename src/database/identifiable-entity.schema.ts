import { Prop } from "@nestjs/mongoose";

export abstract class IdentifiableEntity {
    @Prop()
    readonly _id!: string;
}