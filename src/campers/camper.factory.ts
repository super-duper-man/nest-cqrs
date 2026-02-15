import { Injectable } from "@nestjs/common";
import { EntityFactory } from "src/database/entity.factory";
import { Camper } from "./Camper";
import { CreateCamperRequest } from "./dto/request/create-camper-request.dto";
import { ObjectId } from "mongodb";

@Injectable()
export class CamperFactory implements EntityFactory<Camper> {
    create(createCamperObj: CreateCamperRequest): Camper | Promise<Camper> {
        return new Camper(
            new ObjectId().toHexString(),
            createCamperObj.name,
            createCamperObj.age,
            createCamperObj.allergies,
        );
    }
}