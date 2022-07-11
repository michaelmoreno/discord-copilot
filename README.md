# Discord Copilot

A [GPT-3](https://openai.com/api/) powered chatbot tailored for code examples and software explanation, written in TypeScript using [Discord.js](https://discord.js.org/).
## Table of Contents
- [Architecture](#architecture)
    - [Repository Structure](#repository-structure)
    - [UML Diagram](#uml-diagram)

## Architecture
### Repository Structure
```
.
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── Bot.ts
│   ├── CommandHandler.ts
│   ├── CommandHandling
│   │   ├── Commands
│   │   │   ├── ClearCommand.ts
│   │   │   ├── HelpCommand.ts
│   │   │   ├── HistoryCommand.ts
│   │   │   └── index.ts
│   │   ├── ICommandFactory.ts
│   │   ├── ICommandHandler.ts
│   │   ├── ICommand.ts
│   │   └── index.ts
│   ├── index.ts
│   ├── PromptHandler.ts
│   └── prompts
│       ├── bothPrompt.txt
│       ├── classifyPrompt.txt
│       ├── codeExamplePrompt.txt
│       ├── elaboratePrompt.txt
│       └── plainEnglishPrompt.txt
└── tsconfig.json
```
### UML Diagram
```mermaid
classDiagram
class ICommandHandler {
    <<interface>>
    +handle(ICommand command)* string|null
}
class ICommandFactory {
    <<interface>>
    +keywords: string[]
    +createCommand()* ICommand
    +detectCommand(string command)* bool
}
class ICommand {
    <<interface>>
    +handle(ICommandHandler handler)* string
}
class CommandHandler {
    #factories: ICommandFactory[]

    +sanitize(message: string) string
    +matchFactory(message: string) ICommandFactory|undefined
    +handle(ICommand command) string|null
}
class HistoryCommand {
    +promptHandler: PromptHandler
    +handle(message: string)
}
class ClearCommand {
    +promptHandler: PromptHandler
    +handle(message: string)
}
class HelpCommand {
    +handle(message: string)
}
class HistoryCommandFactory {
    +promptHandler: PromptHandler
    +createCommand() HistoryCommand
    +detectCommand(message: string) bool
}
class ClearCommandFactory {
    +promptHandler: PromptHandler
    +createCommand() ClearCommand
    +detectCommand(message: string) bool
}
class HelpCommandFactory {
    +createCommand() HelpCommand
    +detectCommand(message: string)* bool
}
class PromptHandler {
    +openai: OpenAI
    +prompts: dictionary<string, string>
    +history: string[]
    +maxHistory: number

    +readPrompts(paths: string[]) dictionary<string, string>
    +preparePrompt(prompt: string, message: string) string
    +sendPrompt(prompt: string, engine: string, maxTurns: number) Promise<string>
    +addToHistory(message: string, response: string)
    +queryGPT3(prompt: string, engine: string, maxTurns: number) Promise<string>
    +sanitize(message: string) string
    +format(message: string) string
    +generateReply(message: string) Promise<string>
}
class Bot {
    +token: string
    +client: Client
    +promptHandler: PromptHandler
    +commandHandler: CommandHandler

    +activate()
    +handleMessage(message: any)
}
Bot *-- CommandHandler : Composition
Bot *-- PromptHandler : Composition
ICommandHandler <|.. CommandHandler: Realization
CommandHandler *-- ICommandFactory : Composition
ICommand <|-- HistoryCommand : Realization
ICommand <|-- ClearCommand : Realization
ICommand <|-- HelpCommand : Realization

ICommandFactory <|-- HistoryCommandFactory : Inheritance
ICommandFactory <|-- ClearCommandFactory : Inheritance
ICommandFactory <|-- HelpCommandFactory : Inheritance
```
