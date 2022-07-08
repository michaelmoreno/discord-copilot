import {Client, Intents } from 'discord.js'
import { CommandHandler } from './CommandHandler'
import { PromptHandler } from './PromptHandler'

export class Bot {
    token: string
    client: Client
    promptHandler: PromptHandler
    commandHandler: CommandHandler

    constructor(token: string, promptHandler: PromptHandler, commandHandler: CommandHandler) {
        this.token = token
        this.client = new Client({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
        })
        
        this.promptHandler = promptHandler
        this.commandHandler = commandHandler
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
        const response = this.commandHandler.handle(message.content) || await this.promptHandler.generateReply(message.content)
        message.reply(response)
    }
}
