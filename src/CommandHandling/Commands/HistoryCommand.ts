import { HistoryService } from "../../HistoryService/HistoryService";
import { ICommand } from "../ICommand";
import { ICommandFactory } from "../ICommandFactory";

export class HistoryCommand extends ICommand {
    history: HistoryService

    constructor(history: HistoryService) {
        super()
        this.history = history
    }
    handle(message: string) {
        const history = this.history.get()
        return '`History - ' + `(${history.length}):\`\n\n` + history.join('\n\n')
    }
}

export class HistoryCommandFactory extends ICommandFactory {
    prommptHandler: HistoryService

    constructor(keywords: string[], history: HistoryService) {
        super(keywords)
        this.prommptHandler = history
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
