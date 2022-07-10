import { ICommand } from "./ICommand";

export abstract class ICommandFactory {
    keywords: string[]

    constructor(keywords: string[]) {
        this.keywords = keywords
    }

    abstract createCommand(): ICommand
    abstract detectCommand(message: string): boolean
}
