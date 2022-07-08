export abstract class ICommand {
    abstract keywords: string[];

    abstract handle(message: string): string | null
}
