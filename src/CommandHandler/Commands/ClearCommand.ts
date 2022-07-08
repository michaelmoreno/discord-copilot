import { PromptHandler } from "../../PromptHandler";
import { Command } from "../Command";

export class ClearCommand extends Command {
    promptHandler: PromptHandler

    constructor(keywords: string[], promptHandler: PromptHandler) {
        super(keywords)
        this.promptHandler = promptHandler
    }
    handle(message: string): string | null {
        if (this.match(message)) {
            this.promptHandler.history = []
            return '`History cleared`'
        }
        return null
    }
}
