import { AggregateRoot } from "@nestjs/cqrs";
import { IdentifiableEntity } from "./identifiable-entity.schema";
import { Model, QueryFilter } from "mongoose";
import { EntitySchemaFactory } from "./entity-schema.factory";
import { NotFoundException } from "@nestjs/common";

export abstract class EntityRepository<TSchema extends IdentifiableEntity, TEntity extends AggregateRoot> {
    constructor(
        protected readonly entityModel: Model<TSchema>,
        protected readonly entitySchemaFactory: EntitySchemaFactory<TSchema, TEntity>
    ) { }

    protected async findOne(entityFilterQuery?: QueryFilter<TSchema>): Promise<TEntity> {
        const entityDocument = await this.entityModel.findOne(entityFilterQuery, {}, { lean: true });

        if (!entityDocument) {
            throw new NotFoundException("Entity was not found");
        }

        return this.entitySchemaFactory.createFromSchema(entityDocument);
    }

    protected async find(entityFilterQuery?: QueryFilter<TSchema>): Promise<TEntity[]> {
        return (await this.entityModel.find(entityFilterQuery, {}, { lean: true })).map(entityDocument => this.entitySchemaFactory.createFromSchema(entityDocument));
    }

    async create(entity: TEntity): Promise<void> {
        await new this.entityModel(this.entitySchemaFactory.create(entity)).save();
    }

    protected async findOneAndUpdate(
        entityFilterQuery: QueryFilter<TSchema>,
        entity: TEntity
    ): Promise<void> {
        const updatedEntityDocument = await this.entityModel.findOneAndReplace(
            entityFilterQuery,
            this.entitySchemaFactory.create(entity), {
            new: true,
        }).lean<TSchema>().exec();

        if (!updatedEntityDocument) {
            throw new NotFoundException('Unable to find the entity to replace.');
        }
    }
}