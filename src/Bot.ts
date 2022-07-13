import {Client, Intents } from 'discord.js'
import { ICommandHandler } from './CommandHandling'
import { INLPHandler } from './NLPHandling'

export class Bot {
    token: string
    client: Client
    natLangHandler: INLPHandler
    commandHandler: ICommandHandler

    constructor(token: string, natLangHandler: INLPHandler, commandHandler: ICommandHandler) {
        this.token = token
        this.client = new Client({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
        })
        
        this.natLangHandler = natLangHandler
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
        const response = this.commandHandler.handle(message.content) || await this.natLangHandler.generateReply(message.content)
        message.reply(response)
    }
}
