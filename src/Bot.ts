import {Client, Intents } from 'discord.js'
import { PromptHandler } from './PromptHandler'

export class Bot {
    token: string
    client: Client
    promptHandler: PromptHandler

    constructor(token: string, promptHandler: PromptHandler) {
        this.token = token
        this.client = new Client({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
        })
        
        this.promptHandler = promptHandler
    }
    
    activate() {
        this.client.on('ready', () => console.log('Ready!'));
        this.client.login(this.token)
        this.client.on('messageCreate', this.handleMessage.bind(this))
    }
    async handleMessage(message: any) {
        if (message.author.bot)
            return
        if (!message.mentions.has(this.client.user))
            return

        message.channel.sendTyping();
        const response = await this.promptHandler.generateReply(message.content)
        message.reply(response)
    }
}
