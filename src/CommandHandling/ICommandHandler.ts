import { ICommand } from "./ICommand";

export interface ICommandHandler  {
    handle(message: string): string | null
}
