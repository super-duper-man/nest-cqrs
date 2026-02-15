import { AggregateRoot } from "@nestjs/cqrs";
import { IdentifiableEntity } from "./identifiable-entity.schema";
import { EntityRepository } from "./entity.repository";
import { ObjectId} from 'mongodb';
import { QueryFilter } from "mongoose";

export abstract class BaseEntityRepository<
    TSchema extends IdentifiableEntity,
    TEntity extends AggregateRoot
> extends EntityRepository<TSchema, TEntity> {
    async findOneById(id: string): Promise<TEntity>{
        return this.findOne({_id: new ObjectId(id)} as QueryFilter<TSchema>);
    }

    async findOneAndReplaceById(id: string, entity: TEntity): Promise<void> {
        await this.findOneAndUpdate({_id: new ObjectId(id)} as QueryFilter<TSchema>, entity);
    }

    async findAll(): Promise<TEntity[]> {
        return this.find();
    }
}