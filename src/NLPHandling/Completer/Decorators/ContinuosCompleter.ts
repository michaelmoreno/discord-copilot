import { HistoryService } from "../../../HistoryService/HistoryService";
import { ICompleter } from "../ICompleter";
import { PrefixedCompleter } from "./PrefixedCompleter";

export class ContinuousCompleter extends ICompleter {
    private completer: PrefixedCompleter;
    private history: HistoryService;

    constructor(completer: PrefixedCompleter, history: HistoryService) {
        super();
        this.completer = completer;
        this.history = history;
    }
    formatHistory() {
        return this.history.get().join("\n\n");
    }
    async complete(prompt: string) {
        const historicalPrompt = this.formatHistory() + prompt;
        const response = await this.completer.complete(historicalPrompt);
        this.history.add({prompt, response});
        return response;
    }
}
