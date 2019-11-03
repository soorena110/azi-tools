import {eventManagerHocCreator} from "./HOCSubscription";

export class EventManager<THandler, TEvent> {
    protected _eventHandlers: { [key: string]: THandler[]; } = {};
    public readonly name: string;

    constructor(name = '') {
        this.name = name;
    }


    public addEventListener(theEvent: TEvent, theHandler: THandler) {
        this._eventHandlers[theEvent as any] = this._eventHandlers[theEvent as any] || [];
        this._eventHandlers[theEvent as any].push(theHandler);
    }

    removeEventListener(theEvent: TEvent, theHandler: THandler) {
        const ix = this._eventHandlers[theEvent as any].indexOf(theHandler);
        if (ix != -1)
            this._eventHandlers[theEvent as any].splice(ix, 1);
        else console.warn(`[${this.name}] You are trying to unsubscribe from '${theEvent}',
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

    connectToEvent = eventManagerHocCreator<THandler, TEvent>(this);

    private static dispatchEvent(theHandler: any, ...args: any) {
        theHandler(...args);
    }
}