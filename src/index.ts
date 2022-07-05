import 'dotenv/config';
import OpenAI from 'openai-api';
import {Client, Intents } from 'discord.js'
import { classifyPrompt, plainEnglishPrompt, codeExamplePrompt, bothPrompt } from './prompts';

const token = process.env.TOKEN
const api_key = process.env.OPENAI_API_KEY

const openai = new OpenAI(api_key as string);

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
})

client.on('ready', () => {
    console.log('Ready!')
})



client.user?.setActivity("Ping me with questions!", {
    type: "PLAYING",
})
// client.user?.setStatus('online');

async function completeClassify(prompt: string) {
    const gptResponse = await openai.complete({
        engine: 'text-davinci-002',
        prompt: prompt,
        maxTokens: 3000,
        temperature: 0.3,
        topP: 0.3,
        presencePenalty: 0,
        frequencyPenalty: 0.5,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ['Q:']
    });
    return gptResponse.data.choices[0].text.substring(1);
}

async function completePlainEnglish(prompt: string) {
    const gptResponse = await openai.complete({
        engine: 'text-davinci-002',
        prompt: prompt,
        maxTokens: 3000,
        temperature: 0.3,
        topP: 0.3,
        presencePenalty: 0,
        frequencyPenalty: 0.5,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ['Q:']
    });
    return gptResponse.data.choices[0].text.substring(1);
}

async function completeCodeExample(prompt: string) {
    const gptResponse = await openai.complete({
        engine: 'code-davinci-002',
        prompt: prompt,
        maxTokens: 3000,
        temperature: 0.3,
        topP: 0.3,
        presencePenalty: 0,
        frequencyPenalty: 0.3,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ['Q:']
    });
    return gptResponse.data.choices[0].text.substring(1);
}

async function completeBoth(prompt: string) {
    const gptResponse = await openai.complete({
        engine: 'code-davinci-002',
        prompt: prompt,
        maxTokens: 5000,
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


client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.mentions.has(client.user!)) {
        message.channel.sendTyping();
        let prompt = classifyPrompt(`${message.content}`);
        (completeClassify)(prompt).then(classification => {
            console.log('classification: ', classification);
            if (classification == 'Plain English') {
                prompt = plainEnglishPrompt(`${message.content}`);
                (completePlainEnglish)(prompt).then(response => {
                    message.reply(response);
                })
            } else if (classification == 'Code Example') {
                prompt = codeExamplePrompt(`${message.content}`);
                console.log(prompt);
                (completeCodeExample)(prompt).then(response => {
                    message.reply(response);
                })
            } else if (classification == 'Both') {
                prompt = bothPrompt(`${message.content}`);
                (completeBoth)(prompt).then(response => {
                    message.reply(response);
                })
            }
        });
    }
})


client.login(token)

