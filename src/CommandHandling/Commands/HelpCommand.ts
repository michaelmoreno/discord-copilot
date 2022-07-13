import { ICommand } from "../ICommand";
import { ICommandFactory } from "../ICommandFactory";

export class HelpCommand extends ICommand {
    handle(message: string) {
        return (
            '**How To Talk To Me:**\n' +
            'There are two modes of interaction with me:\n' +
            '`Command Mode` - use built-in commands.\n' +
            '`Natural Language` - ask me questions and I generate novel responses.\n\n' +
            '**Command Mode**:\n' +
            'I will first scan the beginning of your message for any special commands.\n\n' +
            'Available commands:\n' +
            '> `history` - show stored history of previous exchanges\n' +
            '> `clear` - clear history\n' +
            '> `help` - show this message' +
            '\n\n' +
            '**Natural Language**:\n' +
            'If no command is detected, I will interpret your message as natural language and process it with my transformer (GPT-3).\n\n' +
            'I first classify your message into a set of categories:\n' +
            '> `Code Example`\n' +
            '> `Plain English`\n' +
            '> `Both Code Example and Plain English`\n' +
            '> `Elaborate`\n\n' +
            'I then send your message in a tailored prompt respective to its classification to the transformer, and reply with the generated response.'
        )
    }
}

export class HelpCommandFactory extends ICommandFactory {
    constructor(keywords: string[]) {
        super(keywords)
    }
    
    createCommand(): ICommand {
        return new HelpCommand()
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
