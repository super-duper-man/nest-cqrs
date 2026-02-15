import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CamperCreatedEvent } from "./camper-created.event";

@EventsHandler(CamperCreatedEvent)
export class CreateCamperHandler implements IEventHandler<CamperCreatedEvent> {
    constructor() {}

    async handle(event: CamperCreatedEvent): Promise<void> {
        console.log("Camper created:", event.camperId);
    }
}