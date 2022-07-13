import { IClassifier } from "./NLPHandling/Classifier/IClassifier";
import { ICompleter } from "./NLPHandling/Completer/ICompleter";
import { INLPHandler } from "./NLPHandling/INLPHandler";

type completersByClassification = { [key: string]: ICompleter }

export class NLPHandler extends INLPHandler {
    protected classifier: IClassifier
    protected completerRegistry: completersByClassification

    constructor(classifier: IClassifier, completerRegistry: completersByClassification) {
        super()
        this.classifier = classifier
        this.completerRegistry = completerRegistry
    }
    sanitize(message: string): string {
        return message.replace(/<@[^>]+>/g, '').trim()
    }
    format(message: string): string {
        return `Q: ${this.sanitize(message)}\nA:`;
    }
    async generateReply(prompt: string): Promise<string> {
        const messageFormatted = this.format(prompt);
        const classification = await this.classifier.classify(messageFormatted)
        const completer = this.completerRegistry[classification]
        
        return completer.complete(messageFormatted)
    }
}
