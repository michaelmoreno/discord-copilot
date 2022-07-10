import { PromptHandler } from "../../PromptHandler";
import { ICommand } from "../ICommand";
import { ICommandFactory } from "../ICommandFactory";

export class ClearCommand extends ICommand {
    promptHandler: PromptHandler

    constructor(promptHandler: PromptHandler) {
        super()
        this.promptHandler = promptHandler
    }
    handle(message: string) {
        this.promptHandler.history = []
        return '`History cleared`'
    }
}

export class ClearCommandFactory extends ICommandFactory {
    promptHandler: PromptHandler

    constructor(keywords: string[], promptHandler: PromptHandler) {
        super(keywords)
        this.promptHandler = promptHandler
    }
    createCommand(): ClearCommand {
        return new ClearCommand(this.promptHandler)
    }
    detectCommand(message: string) {
        for (const keyword of this.keywords) {
            if (message.startsWith(keyword))
                return true
        }
        return false
    }
}

