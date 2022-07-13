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
    prepare(message: string): string[] {
        let words = message.split(' ')
        const len = words.length
        const cases = []
        for (let i = 0; i < len; i++) {
            cases.push(words.join(' '))
            words.pop()
        }
        return cases
    }
    detectCommand(message: string) {
        const cases = this.prepare(message)
        for (const keyword of this.keywords) {
            if (cases.includes(keyword))
                return true
        }
        return false
    }
}
