import OpenAI from 'openai-api';
import fs from 'fs';

type dictionary = { [key: string]: string };

export class PromptHandler {
    openai: OpenAI;
    prompts: dictionary
    history: string[]
    maxHistory: number


    constructor(api_key: string, paths: string[], maxHistory: number = 10) {
        this.openai = new OpenAI(api_key);
        this.prompts = this.readPrompts(paths)
        this.history = []
        this.maxHistory = maxHistory
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
        return this.prompts[template] + `${message}\nA:`;
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
    addToHistory(message: string, response: string): void {
        this.history.push(`${message}\nA: ${response.trim()}`);
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
    }
    async queryGPT3(prompt: string, message: string, engine: string, maxTokens: number): Promise<string> {
        const preparedPrompt = this.preparePrompt(prompt, message);
        const response = await this.sendPrompt(preparedPrompt, engine, maxTokens);
        return response;
    }
    sanitize(message: string): string {
        return message.replace(/<@[^>]+>/g, '').trim()
    }
    format(message: string): string {
        return `Q: ${this.sanitize(message)}`;
    }
    async generateReply(message: string): Promise<string> {
        const messageFormatted = this.format(message);
        const classification = await this.queryGPT3(
            'classifyPrompt',
            messageFormatted,
            'text-davinci-002',
            3000);
        console.log('classification:', classification);
        switch (classification) {
            case 'Code Example':
                return this.queryGPT3(
                    'codeExamplePrompt',
                    messageFormatted,
                    'code-davinci-002',
                    3000
                    ).then(response => {
                        this.addToHistory(messageFormatted, response)
                        return response;
                    });
            case 'Plain English':
                return this.queryGPT3(
                    'plainEnglishPrompt',
                    messageFormatted,
                    'text-davinci-002',
                    3000
                    ).then(response => {
                        this.addToHistory(messageFormatted, response)
                        return response;
                    });
            case 'Both':
                return this.queryGPT3(
                    'bothPrompt',
                    messageFormatted,
                    'code-davinci-002',
                    3000
                ).then(response => {
                    this.addToHistory(messageFormatted, response);
                    return response;
                });
            case 'Elaborate':
                return this.queryGPT3(
                    'elaboratePrompt',
                    this.history.join('\n\n') + '\n\n' + messageFormatted,
                    'code-davinci-002',
                    3000
                ).then(response => {
                    this.addToHistory(messageFormatted, response);
                    return response;
                });
            default:
                return 'Error classifying message.';
        }
    }
}
