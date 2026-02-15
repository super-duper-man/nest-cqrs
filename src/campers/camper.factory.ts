import { Injectable } from "@nestjs/common";
import { EntityFactory } from "src/database/entity.factory";
import { Camper } from "./Camper";
import { CreateCamperRequest } from "./dto/request/create-camper-request.dto";
import { ObjectId } from "mongodb";
import { CamperCreatedEvent } from "./events/camper-created.event";
import { CamperEntityRepository } from "./db/camper-entity.repository";

@Injectable()
export class CamperFactory implements EntityFactory<Camper> {
    constructor(private readonly camperEntityRepository: CamperEntityRepository) {}

    async create(createCamperObj: CreateCamperRequest): Promise<Camper> {
        const camper =  new Camper(
            new ObjectId().toHexString(),
            createCamperObj.name,
            createCamperObj.age,
            createCamperObj.allergies,
        );

        await this.camperEntityRepository.create(camper);

        camper.apply(
            new CamperCreatedEvent(camper.getId())
        );

        return camper;
    }
}