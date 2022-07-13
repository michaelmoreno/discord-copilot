import { HistoryService } from "../../HistoryService/HistoryService";
import { ICommand } from "../ICommand";
import { ICommandFactory } from "../ICommandFactory";

export class ClearCommand extends ICommand {
    history: HistoryService

    constructor(history: HistoryService) {
        super()
        this.history = history
    }
    handle(message: string) {
        this.history.clear()
        return '`History cleared`'
    }
}

export class ClearCommandFactory extends ICommandFactory {
    history: HistoryService

    constructor(keywords: string[], history: HistoryService) {
        super(keywords)
        this.history = history
    }
    createCommand(): ClearCommand {
        return new ClearCommand(this.history)
    }
    detectCommand(message: string) {
        for (const keyword of this.keywords) {
            if (message.startsWith(keyword))
                return true
        }
        return false
    }
}

