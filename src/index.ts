import 'dotenv/config';
import path from 'path';
import { PromptHandler } from './PromptHandler';
import { CommandHandler } from './CommandHandler';
import * as Commands from './CommandHandler/Commands'
import { Bot } from './Bot';

const token = process.env.TOKEN as string;
const api_key = process.env.OPENAI_API_KEY as string;

const promptHandler = new PromptHandler(api_key, [
    'classifyPrompt.txt',
    'plainEnglishPrompt.txt',
    'codeExamplePrompt.txt',
    'bothPrompt.txt',
    'elaboratePrompt.txt',
].map(prompt => path.join(__dirname, 'prompts/' + prompt)));

const historyCommand = new Commands.HistoryCommand(
    ['history'],
    promptHandler
)

const clearCommand = new Commands.ClearCommand(
    ['clear', 'clear history', 'history clear'],
    promptHandler
)

const commandHandler = new CommandHandler([
    historyCommand,
    clearCommand,
])

const bot = new Bot(token, promptHandler, commandHandler);
bot.activate();
