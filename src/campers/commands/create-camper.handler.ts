import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateCamperCommand } from "./create-camper.command";
import { CamperFactory } from "../camper.factory";

@CommandHandler(CreateCamperCommand)
export class CreateCamperHandler implements ICommandHandler<CreateCamperCommand> {
    constructor(private readonly camperFactory: CamperFactory) {}

    async execute(command: CreateCamperCommand): Promise<void> {
        this.camperFactory.create(command.createCamperRequest);
    }
}