export abstract class ICommand {
    abstract handle(message: string): string
}
