import { PromptHandler } from "../../PromptHandler";
import { Command } from "../Command";

export class HistoryCommand extends Command {
    promptHandler: PromptHandler

    constructor(keywords: string[], promptHandler: PromptHandler) {
        super(keywords)
        this.promptHandler = promptHandler
    }
    handle(message: string): string | null {
        if (this.match(message)) {
            const history = this.promptHandler.history
            return '`History - ' + `(${history.length}):\`\n\n` + history.join('\n\n')
        }
        return null
    }
}
