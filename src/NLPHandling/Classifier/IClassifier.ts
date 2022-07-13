export abstract class IClassifier {
    abstract classify(text: string): Promise<string>
}
