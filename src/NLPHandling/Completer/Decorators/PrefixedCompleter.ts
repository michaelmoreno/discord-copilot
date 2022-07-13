import { ICompleter } from "../ICompleter";

export class PrefixedCompleter implements ICompleter {
    private completer: ICompleter;
    private prefix: string;

    constructor(completer: ICompleter, prefix: string) {
        this.completer = completer;
        this.prefix = prefix;
    }

    async complete(prompt: string) {
        const prefixedPrompt = this.prefix + prompt;
        return this.completer.complete(prefixedPrompt);
    }
}
