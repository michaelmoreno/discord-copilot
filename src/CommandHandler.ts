import { ICommand } from "./CommandHandler/ICommand";
import { ICommandHandler } from "./CommandHandler/ICommandHandler";

export class CommandHandler implements ICommandHandler {
    commands: ICommand[];

    constructor(commands: ICommand[]) {
        this.commands = commands
    }
    sanitize(message: string): string {
        return message.replace(/<@[^>]+>/g, '').trim()
    }
    handle(message: string): string | null {
        const sanitized = this.sanitize(message)
        for (const command of this.commands) {
            const reply = command.handle(sanitized)
            if (reply)
                return reply
        }
        return null
    }
}
