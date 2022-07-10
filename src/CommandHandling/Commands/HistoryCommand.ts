import { PromptHandler } from "../../PromptHandler";
import { ICommand } from "../ICommand";
import { ICommandFactory } from "../ICommandFactory";

export class HistoryCommand extends ICommand {
    promptHandler: PromptHandler

    constructor(promptHandler: PromptHandler) {
        super()
        this.promptHandler = promptHandler
    }
    handle(message: string) {
        const history = this.promptHandler.history
        return '`History - ' + `(${history.length}):\`\n\n` + history.join('\n\n')
    }
}

export class HistoryCommandFactory extends ICommandFactory {
    prommptHandler: PromptHandler

    constructor(keywords: string[], promptHandler: PromptHandler) {
        super(keywords)
        this.prommptHandler = promptHandler
    }
    createCommand(): HistoryCommand {
        return new HistoryCommand(this.prommptHandler)
    }
    detectCommand(message: string) {
        for (const keyword of this.keywords) {
            if (message.startsWith(keyword))
                return true
        }
        return false
    }
}
