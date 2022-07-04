import 'dotenv/config';
import OpenAI from 'openai-api';
import {Client, Intents } from 'discord.js'

const token = process.env.TOKEN
const api_key = process.env.OPENAI_API_KEY

const openai = new OpenAI(api_key as string);

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
})

client.on('ready', () => {
    console.log('Ready!')
})

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.mentions.has(client.user!)) {
        console.log("Mentioned");
        message.reply("I'm here!");
    }
})


client.login(token)

