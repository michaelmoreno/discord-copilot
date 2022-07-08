import OpenAI from 'openai-api';
import fs from 'fs';

type dictionary = { [key: string]: string };

export class PromptHandler {
    openai: OpenAI;
    prompts: dictionary

    constructor(api_key: string, paths: string[]) {
        this.openai = new OpenAI(api_key);
        this.prompts = this.readPrompts(paths)
    }

    readPrompts(paths: string[]): dictionary {
        const dictionary: dictionary = {};

        for (const path of paths) {
            const name = path.split('/').at(-1)!.split('.txt')[0];
            const content = fs.readFileSync(path, 'utf8');
            dictionary[name] = content;
        }

        return dictionary;
    }
    preparePrompt(template: string, message: string): string {
        return this.prompts[template] + `Q: ${message}\nA:`;
    }
    async sendPrompt(prompt: string, engine: string, maxTokens: number): Promise<string> {
        const gptResponse = await this.openai.complete({
            engine: engine,
            prompt: prompt,
            maxTokens: maxTokens,
            temperature: 0.3,
            topP: 0.3,
            presencePenalty: 0,
            frequencyPenalty: 0,
            bestOf: 1,
            n: 1,
            stream: false,
            stop: ['Q:']
        });
        return gptResponse.data.choices[0].text.substring(1);
    }
    async queryGPT3(prompt: string, message: string, engine: string, maxTokens: number): Promise<string> {
        const preparedPrompt = this.preparePrompt(prompt, message);
        const response = await this.sendPrompt(preparedPrompt, engine, maxTokens);
        return response;
    }
    async generateReply(message: string): Promise<string> {
        const classification = await this.queryGPT3('classifyPrompt', message, 'text-davinci-002', 3000);
        console.log('classification:', classification);
        switch (classification) {
            case 'Code Example':
                return this.queryGPT3('codeExamplePrompt', message, 'code-davinci-002', 3000);
            case 'Plain English':
                return this.queryGPT3('plainEnglishPrompt', message, 'text-davinci-002', 3000);
            case 'Both':
                return this.queryGPT3('bothPrompt', message, 'code-davinci-002', 5000);
            default:
                return 'Error classifying message.';
        }
    }
}
