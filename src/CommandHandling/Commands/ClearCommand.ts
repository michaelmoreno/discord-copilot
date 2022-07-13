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

