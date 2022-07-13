import OpenAI, { Completion } from "openai-api";
import { ICompleter } from "./ICompleter";

export class GPT3Completer extends ICompleter {
    private client: OpenAI
    private options: any

    constructor(client: OpenAI, options: any) {
        super()
        this.client = client
        this.options = options
    }

    extractResponse(response: Completion): string {
        return response.data.choices[0].text.substring(1)
    }
    async complete(prompt: string): Promise<string> {
        const response = await this.client.complete({
            prompt,
            ...this.options
        })
        return this.extractResponse(response)
    }
}
