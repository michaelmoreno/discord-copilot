import 'dotenv/config';
import path from 'path';
import { PromptHandler } from './PromptHandler';
import { Bot } from './Bot';

const token = process.env.TOKEN as string;
const api_key = process.env.OPENAI_API_KEY as string;

const promptHandler = new PromptHandler(api_key, [
    'classifyPrompt.txt',
    'plainEnglishPrompt.txt',
    'codeExamplePrompt.txt',
    'bothPrompt.txt'
].map(prompt => path.join(__dirname, 'prompts/' + prompt)));

const bot = new Bot(token, promptHandler);
bot.activate();
