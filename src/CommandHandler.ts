import { ICommandFactory } from "./CommandHandling";
import { ICommandHandler } from "./CommandHandling";

export class CommandHandler implements ICommandHandler {
    protected factories: ICommandFactory[]

    constructor(factories: ICommandFactory[]) {
        this.factories = factories
    }
    sanitize(message: string): string {
        return message.replace(/<@[^>]+>/g, '').trim()
    }
    matchFactory(message: string): ICommandFactory | undefined {
        return this.factories.find(factory => factory.detectCommand(message))
    }
    handle(message: string) {
        const sanitized = this.sanitize(message)
        const factory = this.matchFactory(sanitized)
        if (!factory) {
            console.log('No commands found for known factories in message: ' + sanitized)
            return null
        }
        const command = factory.createCommand()
        return command.handle(sanitized)
    }
}
