export abstract class INLPHandler {
    abstract generateReply(prompt: string): Promise<string>
}
