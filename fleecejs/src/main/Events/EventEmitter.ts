import { CoreLogger } from "../../index.ts";
import { FleeceEvent } from "./Event.ts";

export type EventTypeMap = Record<string, FleeceEvent>;
export type EventKey<K extends EventTypeMap> = string & keyof K;
export type EventHandler<E extends FleeceEvent> = (args: E) => void;


export interface Disposable {
    dispose() : void;
}

export class EventEmitter<EventMap extends Record<string, FleeceEvent>> {
   

    public clear() {
        this.listeners = {};
    }

    public on<EventName extends EventKey<EventMap>>(eventName: EventName, handler: EventHandler<EventMap[EventName]>) : Disposable {
        this.listeners[eventName] = this.listeners[eventName] ?? new Set<EventHandler<EventMap[EventName]>>();
        this.listeners[eventName]!.add(handler);
        CoreLogger.debug(`EventEmitter: ${this.name} is now listening for ${eventName}`);
        return {
            dispose: () => {
                this.off(eventName, handler);
            }
        }
        
    }

    public off<EventName extends EventKey<EventMap>>(eventName: EventName, handler?: EventHandler<EventMap[EventName]>) : void {
        if (handler && (this.listeners[eventName]?.size ?? 0 )> 0) {
            const success = this.listeners[eventName]?.delete(handler);
            if(success){
                CoreLogger.debug(`EventEmitter: ${this.name} just removed one of its listeners for ${eventName}`);
            }
            else {
                CoreLogger.warn(`EventEmitter: ${this.name} could not remove a listener for ${eventName}`);
            }
        } else {
            //instead of clearing the Set, we can just delete the key
            delete this.listeners[eventName];
            CoreLogger.debug(`EventEmitter: ${this.name} is no longer listening for ${eventName}`);
        }
    }

    public emit<EventName extends EventKey<EventMap>>(eventName: EventName, event: EventMap[EventName]) : void {
        if (this.isPaused) {
            CoreLogger.warn(`EventEmitter: ${this.name} is paused, not emitting ${eventName}`);
            return;
        }
        this.listeners[eventName]?.forEach(handler => handler(event));
    }

    public pause() {
        this.isPaused = true;
        CoreLogger.debug(`EventEmitter: ${this.name} paused`);
    }

    public resume() {
        this.isPaused = false;
        CoreLogger.debug(`EventEmitter: ${this.name} resumed`);
    }

    public get Name() {
        return this.name;
    }


    constructor(private name: string = "unnamed") {
        this.listeners = {};
    }
    private isPaused = false;
    private listeners: {[K in keyof EventMap]?: Set<EventHandler<EventMap[K]>>} = {};
}
