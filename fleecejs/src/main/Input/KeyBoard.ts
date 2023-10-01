
import { Disposable, EventEmitter, EventHandler, EventKey } from "../Events/EventEmitter.ts";
import { KeyPressEvent, KeyEvents, KeyReleaseEvent, Keys, KeyHoldEvent } from "../Events/KeyEvent.ts";
import { CoreLogger } from "../Logging/Logger.ts";


type KeyBoardConfig = {
    canvas?: HTMLCanvasElement;
}

export class KeyBoard {

    private keys: Set<Keys> = new Set<Keys>();
    private keysReleasedThisFrame: Set<Keys> = new Set<Keys>();
    private keysPressedThisFrame: Set<Keys> = new Set<Keys>();

    private events = new EventEmitter<KeyEvents>("Keyboard");

    constructor(cfg: KeyBoardConfig) {
        const window = cfg.canvas ?? document;
        window.addEventListener('keydown', (e) => this.onKeyDown(e as KeyboardEvent));
        window.addEventListener('keyup', (e) => this.onKeyUp(e as KeyboardEvent));
        CoreLogger.info('Keyboard initialized');
    
    }

    private onKeyDown(e: KeyboardEvent) {
        this.keysPressedThisFrame.add(e.code as Keys);
        this.keys.add(e.code as Keys);
        this.events.emit("press", new KeyPressEvent(e.code as Keys));
    }

    private onKeyUp(e: KeyboardEvent) {
        const code = e.code as Keys;
        this.keysReleasedThisFrame.add(code)
        this.keys.delete(code);
        this.events.emit('release', new KeyReleaseEvent(code));
    }

    public update(){
        this.keysPressedThisFrame.clear();
        this.keysReleasedThisFrame.clear();
        for (const key of this.keys) {
            this.events.emit('hold', new KeyHoldEvent(key));
        }
        
    }

    public on<EventName extends EventKey<KeyEvents>>(eventName: EventName, handler: EventHandler<KeyEvents[EventName]>) : Disposable {
        return this.events.on(eventName, handler);
    }

    public off<EventName extends EventKey<KeyEvents>>(eventName: EventName, handler?: EventHandler<KeyEvents[EventName]>) : void {
        this.events.off(eventName, handler);
    }
}