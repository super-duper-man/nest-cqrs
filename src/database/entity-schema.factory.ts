import { AggregateRoot } from "@nestjs/cqrs";
import { IdentifiableEntity } from "./identifiable-entity.schema";

export interface EntitySchemaFactory<TSchema extends  IdentifiableEntity, TEntity extends AggregateRoot> {
    create(entity: TEntity): TSchema;
    createFromSchema(entitySchema: TSchema): TEntity;
}