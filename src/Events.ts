export class EventManager<THandler = Function, TEvent = string> {
    protected _eventHandlers: { [key: string]: THandler[]; } = {};
    private readonly _name: string;

    constructor(name = '') {
        this._name = name;
    }


    public addEventListener(theEvent: TEvent, theHandler: THandler) {
        this._eventHandlers[theEvent as any] = this._eventHandlers[theEvent as any] || [];
        this._eventHandlers[theEvent as any].push(theHandler);
    }

    removeEventListener(theEvent: TEvent, theHandler: THandler) {
        const ix = this._eventHandlers[theEvent as any].indexOf(theHandler);
        if (ix != -1)
            this._eventHandlers[theEvent as any].splice(ix, 1);
        else console.warn(`[${this._name}] You are trying to unsubscribe from '${theEvent}',
         but the handler is not subscribed before`)
    }

    removeAllListeners(theEvent: TEvent) {
        this._eventHandlers[theEvent as any] = [];
    }

    trigger(theEvent: TEvent, ...args: any) {
        const theHandlers = this._eventHandlers[theEvent as any];
        if (theHandlers) {
            for (let i = 0; i < theHandlers.length; i += 1) {
                EventManager.dispatchEvent(theHandlers[i], ...args);
            }
        }
    }

    private static dispatchEvent(theHandler: any, ...args: any) {
        theHandler(...args);
    }
}