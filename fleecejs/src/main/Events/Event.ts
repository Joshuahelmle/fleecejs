/**
 * An event currently blocks the application from continuing until it is resolved.
 * @todo refactor into a queue so events can be handled once per frame
 */


export enum EventType {
    None = 0,
    KeyDown, KeyUp, KeyHold,
    MouseDown, MouseUp, MouseMove, MouseWheel,
    Resize, Focus, Blur, Close,
    AppTick, AppUpdate, AppRender,
    
}

export enum EventCategory {
    None = 0,
    Application = 1 << 0,
    Input = 1 << 1,
    Keyboard = 1 << 2,
    Mouse = 1 << 3,
    MouseButton = 1 << 4,
} 

export abstract class FleeceEvent {
    private isHandled: boolean = false;

    public abstract getEventType(): EventType;
    public abstract getEventName(): string;

    public abstract getCategoryFlags(): EventCategory;

    public isInCategory(category: EventCategory): boolean {
        return (this.getCategoryFlags() & category) !== 0;
    }

    public toString(): string {
        return this.getEventName();
    }

    public get handled(): boolean {
        return this.isHandled;
    }

    public cancel(): void { this.isHandled = true; }
}