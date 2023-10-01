import { EventCategory, EventType, FleeceEvent } from "./Event.ts";

 
 export enum Keys {// NUMPAD
 Num0 = 'Numpad0',
 Num1 = 'Numpad1',
 Num2 = 'Numpad2',
 Num3 = 'Numpad3',
 Num4 = 'Numpad4',
 Num5 = 'Numpad5',
 Num6 = 'Numpad6',
 Num7 = 'Numpad7',
 Num8 = 'Numpad8',
 Num9 = 'Numpad9',
 NumAdd = 'NumpadAdd',
 NumSubtract = 'NumpadSubtract',
 NumMultiply = 'NumpadMultiply',
 NumDivide = 'NumpadDivide',
 // NumComma = 'NumpadComma', // not x-browser
 NumDecimal = 'NumpadDecimal',
 Numpad0 = 'Numpad0',
 Numpad1 = 'Numpad1',
 Numpad2 = 'Numpad2',
 Numpad3 = 'Numpad3',
 Numpad4 = 'Numpad4',
 Numpad5 = 'Numpad5',
 Numpad6 = 'Numpad6',
 Numpad7 = 'Numpad7',
 Numpad8 = 'Numpad8',
 Numpad9 = 'Numpad9',
 NumpadAdd = 'NumpadAdd',
 NumpadSubtract = 'NumpadSubtract',
 NumpadMultiply = 'NumpadMultiply',
 NumpadDivide = 'NumpadDivide',
 // NumpadComma = 'NumpadComma', // not x-browser
 NumpadDecimal = 'NumpadDecimal',

 // MODIFIERS
 NumLock = 'NumLock',
 ShiftLeft = 'ShiftLeft',
 ShiftRight = 'ShiftRight',
 AltLeft = 'AltLeft',
 AltRight = 'AltRight',
 ControlLeft = 'ControlLeft',
 ControlRight = 'ControlRight',
 MetaLeft = 'MetaLeft',
 MetaRight = 'MetaRight',

 // NUMBERS
 Key0 = 'Digit0',
 Key1 = 'Digit1',
 Key2 = 'Digit2',
 Key3 = 'Digit3',
 Key4 = 'Digit4',
 Key5 = 'Digit5',
 Key6 = 'Digit6',
 Key7 = 'Digit7',
 Key8 = 'Digit8',
 Key9 = 'Digit9',
 Digit0 = 'Digit0',
 Digit1 = 'Digit1',
 Digit2 = 'Digit2',
 Digit3 = 'Digit3',
 Digit4 = 'Digit4',
 Digit5 = 'Digit5',
 Digit6 = 'Digit6',
 Digit7 = 'Digit7',
 Digit8 = 'Digit8',
 Digit9 = 'Digit9',

 // FUNCTION KEYS
 F1 = 'F1',
 F2 = 'F2',
 F3 = 'F3',
 F4 = 'F4',
 F5 = 'F5',
 F6 = 'F6',
 F7 = 'F7',
 F8 = 'F8',
 F9 = 'F9',
 F10 = 'F10',
 F11 = 'F11',
 F12 = 'F12',

 // LETTERS
 A = 'KeyA',
 B = 'KeyB',
 C = 'KeyC',
 D = 'KeyD',
 E = 'KeyE',
 F = 'KeyF',
 G = 'KeyG',
 H = 'KeyH',
 I = 'KeyI',
 J = 'KeyJ',
 K = 'KeyK',
 L = 'KeyL',
 M = 'KeyM',
 N = 'KeyN',
 O = 'KeyO',
 P = 'KeyP',
 Q = 'KeyQ',
 R = 'KeyR',
 S = 'KeyS',
 T = 'KeyT',
 U = 'KeyU',
 V = 'KeyV',
 W = 'KeyW',
 X = 'KeyX',
 Y = 'KeyY',
 Z = 'KeyZ',
 KeyA = 'KeyA',
 KeyB = 'KeyB',
 KeyC = 'KeyC',
 KeyD = 'KeyD',
 KeyE = 'KeyE',
 KeyF = 'KeyF',
 KeyG = 'KeyG',
 KeyH = 'KeyH',
 KeyI = 'KeyI',
 KeyJ = 'KeyJ',
 KeyK = 'KeyK',
 KeyL = 'KeyL',
 KeyM = 'KeyM',
 KeyN = 'KeyN',
 KeyO = 'KeyO',
 KeyP = 'KeyP',
 KeyQ = 'KeyQ',
 KeyR = 'KeyR',
 KeyS = 'KeyS',
 KeyT = 'KeyT',
 KeyU = 'KeyU',
 KeyV = 'KeyV',
 KeyW = 'KeyW',
 KeyX = 'KeyX',
 KeyY = 'KeyY',
 KeyZ = 'KeyZ',

 // SYMBOLS
 Semicolon = 'Semicolon',
 Quote = 'Quote',
 Comma = 'Comma',
 Minus = 'Minus',
 Period = 'Period',
 Slash = 'Slash',
 Equal = 'Equal',
 BracketLeft = 'BracketLeft',
 Backslash = 'Backslash',
 BracketRight = 'BracketRight',
 Backquote = 'Backquote',

 // DIRECTIONS
 Up = 'ArrowUp',
 Down = 'ArrowDown',
 Left = 'ArrowLeft',
 Right = 'ArrowRight',
 ArrowUp = 'ArrowUp',
 ArrowDown = 'ArrowDown',
 ArrowLeft = 'ArrowLeft',
 ArrowRight = 'ArrowRight',

 // OTHER
 Space = 'Space',
 Backspace = 'Backspace',
 Delete = 'Delete',
 Esc = 'Escape',
 Escape = 'Escape',
 Enter = 'Enter',
 NumpadEnter = 'NumpadEnter',
 ContextMenu = 'ContextMenu'
}

export type KeyEvents = {
    press: KeyPressEvent,
    hold: KeyEvent,
    release: KeyReleaseEvent
}

abstract class KeyEvent extends FleeceEvent {

    constructor(protected keyCode: Keys) { super(); }

    public getCategoryFlags(): EventCategory {
        return EventCategory.Keyboard | EventCategory.Input;
    }

    public  getKeyCode(): Keys {
        return this.keyCode;
    }

    public abstract getEventName(): string;

}

export class KeyPressEvent extends KeyEvent {

    constructor(key: Keys) {
        super(key);
        this.keyCode = key;
    }


    public getEventType(): EventType {
        return EventType.KeyDown;
    }

    public getEventName(): string {
        return `Key Down: ${this.keyCode}`
    }

}

export class KeyReleaseEvent extends KeyEvent {

    constructor(key: Keys) {
        super(key);
    }

    public getEventName(): string {
        return `Key Up: ${this.keyCode}`
    }

    public getEventType(): EventType {
        return EventType.KeyUp;
    }
    
}

export class KeyHoldEvent extends KeyEvent {

    constructor(key: Keys) {
        super(key);
    }

    public getEventName(): string {
        return `Key Press: ${this.keyCode}`
    }

    public getEventType(): EventType {
        return EventType.KeyHold;
    }
    
}