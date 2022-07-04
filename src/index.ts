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


function interpolate(message: string): string {
    let prompt = `
    This chatbot gives single code example answers to programming questions or plain english explanations of concepts. DO NOT ATTEMPT TO USE COMMENTS IN CODE.
    [Code Example Format]
    
    Q: for loop in python
    A: \`\`\`py
    letters = ['a', 'b', 'c', 'd']
    for i in range(len(letters)):
        print(i, letters[i])
    \`\`\`
    Q: draw fractal tree using turtle in python
    A: \`\`\`py
    import turtle
    
    def draw_branch(t, branch_length):
        if branch_length > 30:
            t.forward(branch_length)
            t.left(20)
            draw_branch(t, branch_length * 0.85)
            t.right(40)
            draw_branch(t, branch_length * 0.85)
            t.left(20)
            t.backward(branch_length)
    
    def main():
        t = turtle.Turtle()
        screen = turtle.Screen()
        t.left(90)
        draw_branch(t, 100)
        screen.exitonclick()
    
    main()
    \`\`\`

    [Plain English Explanation Format]
    
    Q: What is the Incompleteness theorem and who found it
    A: The incompleteness theorem is a theorem in mathematical logic that states that any effectively generated theory capable of expressing elementary arithmetic cannot be both consistent and complete. In other words, for any consistent, effectively generated formal theory that proves certain basic arithmetic truths, there is an arithmetical statement that is true, but not provable in the theory. The theorem was proven by Kurt Gödel in 1931.
Q: ${message}
`.trim()
    return prompt
}


client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.mentions.has(client.user!)) {
        const prompt = interpolate(message.content);
        (async () => {
            const gptResponse = await openai.complete({
                engine: 'code-davinci-002',
                prompt: prompt,
                maxTokens: 3000,
                temperature: 0.3,
                topP: 0.3,
                presencePenalty: 0,
                frequencyPenalty: 0.5,
                bestOf: 1,
                n: 1,
                stream: false,
                stop: ['Q:', '#', '//']
            });

            message.reply(`${gptResponse.data.choices[0].text.substring(4)}`);
            console.log(JSON.stringify(gptResponse.data, null, 2));
        })();
    }
})


client.login(token)

