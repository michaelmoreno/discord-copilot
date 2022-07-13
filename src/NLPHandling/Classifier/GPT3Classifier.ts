import { ICompleter } from "../Completer/ICompleter";
import { IClassifier } from "./IClassifier";

export class GPT3Classifier extends IClassifier {
    private prompt: string;
    private completer: ICompleter;
    
    constructor(prompt: string, completer: ICompleter) {
        super()
        this.prompt = prompt;
        this.completer = completer;
    }
    async classify(text: string): Promise<string> {
        const response = await this.completer.complete(this.prompt + text);
        return response.trim();
    }
}
