import { ICommand } from "./ICommand";

export abstract class Command implements ICommand {
    keywords: string[]

    constructor(keywords: string[]) {
        this.keywords = keywords
    }
    match(message: string): boolean {
        for (const keyword of this.keywords) {
            if (message.startsWith(keyword))
                return true
        }
        return false
    }
    abstract handle(message: any): string | null
}
