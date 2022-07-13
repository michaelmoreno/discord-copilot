import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { CommandHandler } from './CommandHandler';
import { ClearCommandFactory, HistoryCommandFactory, HelpCommandFactory } from './CommandHandling';
import { Bot } from './Bot';
import { GPT3Classifier, GPT3Completer, PrefixedCompleter, } from './NLPHandling';
import OpenAI from 'openai-api';
import { NLPHandler } from './NLPHandler';
import { ContinuousCompleter } from './NLPHandling/Completer/Decorators/ContinuosCompleter';
import { HistoryService } from './HistoryService/HistoryService';


const token = process.env.TOKEN as string;
const api_key = process.env.OPENAI_API_KEY as string;

const classifyPrompt = fs.readFileSync(
    path.join(__dirname, 'prompts/classifyPrompt.txt'), 'utf8'
);

const openaiClient = new OpenAI(api_key);

const prompts = {
    'Plain English': {
        'path': 'prompts/plainEnglishPrompt.txt',
        'completerOptions': {
            engine: 'text-davinci-002',
            maxTokens: 2000,
            stop: ['Q:'],
        },
    },
    'Code Example': {
        'path': 'prompts/codeExamplePrompt.txt',
        'completerOptions': {
            engine: 'code-davinci-002',
            maxTokens: 2000,
            stop: ['Q:'],
        },
    },
    'Both': {
        'path': 'prompts/bothPrompt.txt',
        'completerOptions': {
            engine: 'code-davinci-002',
            maxTokens: 3000,
            stop: ['Q:'],
        },
    },
    'Elaborate': {
        'path': 'prompts/elaboratePrompt.txt',
        'completerOptions': {
            engine: 'code-davinci-002',
            maxTokens: 3000,
            stop: ['Q:'],
        },
    },
}

const history = new HistoryService(10);

const completersByPrompt = Object.entries(prompts).reduce((acc, [prompt, fields]) => {
    const content = fs.readFileSync(path.join(__dirname, fields.path), 'utf8');
    const completer = new ContinuousCompleter(
        new PrefixedCompleter(
            new GPT3Completer(openaiClient, fields.completerOptions),
            content
        ),
        history
    );
    return {
        ...acc,
        [prompt]: completer 
    };
}, {});

const classifierCompleter = new GPT3Completer(openaiClient, {
    engine: 'text-davinci-002',
    maxTokens: 600,
    stop: ['Q:'],
})

const classifier = new GPT3Classifier(classifyPrompt, classifierCompleter);
const natLangHandler = new NLPHandler(classifier, completersByPrompt);

const commandHandler = new CommandHandler([
    new HistoryCommandFactory(['history'], history),
    new ClearCommandFactory(['clear'], history),
    new HelpCommandFactory(['help', 'commands', 'h', '?']),
])

const bot = new Bot(token, natLangHandler, commandHandler);
bot.activate();
