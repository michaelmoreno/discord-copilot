import 'dotenv/config';
import path from 'path';
import { PromptHandler } from './PromptHandler';
import { CommandHandler } from './CommandHandler';
import { ClearCommandFactory, HistoryCommandFactory, HelpCommandFactory } from './CommandHandling';
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

const commandHandler = new CommandHandler([
    new HistoryCommandFactory(['history'], promptHandler),
    new ClearCommandFactory(['clear'], promptHandler),
    new HelpCommandFactory(['help', 'commands', 'h', '?']),
])

const bot = new Bot(token, promptHandler, commandHandler);
bot.activate();
