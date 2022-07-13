export abstract class ICompleter {
    abstract complete(text: string): Promise<string>
}
