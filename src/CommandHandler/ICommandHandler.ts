import { ICommand } from "./ICommand";

export interface ICommandHandler  {
    commands: ICommand[];

    handle(message: string): string | null
}
