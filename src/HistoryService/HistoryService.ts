export class HistoryService {
    private exchanges: Record<string, string>[]
    private maxHistory: number

    constructor(maxHistory: number) {
        this.exchanges = []
        this.maxHistory = maxHistory
    }
    public get(): Record<string, string>[] {
        return this.exchanges
    }
    public length(): number {
        return this.exchanges.length
    }
    public add(exchange: Record<string, string>): void {
        this.exchanges.push(exchange)
        if (this.exchanges.length > this.maxHistory) {
            this.exchanges.shift()
        }
    }
    public clear() {
        this.exchanges = []
    }
}
