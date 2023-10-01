import { FleeceEvent, EventEmitter, CoreLogger } from "../../index.ts";
import { EventType, EventCategory } from "../../main/Events/Event.ts";
import {describe, it, expect, vitest} from 'vitest'


class MockEvent extends FleeceEvent {
    public getEventType(): EventType {
        throw new Error("Method not implemented.");
    }
    public getEventName(): string {
        throw new Error("Method not implemented.");
    }
    public getCategoryFlags(): EventCategory {
        throw new Error("Method not implemented.");
    }
}
describe('EventEmitter', function() {
    it('should be defined', function() {
        expect(EventEmitter).toBeDefined();
    });

    it('should be constructable with a name', function() {
        const emitter = new EventEmitter('test');
        expect(emitter).toBeDefined();
        expect(emitter.Name).toBe('test');
    });

    it('should be constructable without a name and get unnamed as name', function() {
        const emitter = new EventEmitter();
        expect(emitter).toBeDefined();
        expect(emitter.Name).toBe('unnamed');
    });

    it('should be able to listen on the same Event multiple times', function() {
        type evMap = {'someName': MockEvent};
        const emitter = new EventEmitter<evMap>();
        const listener = vitest.fn();
        const event = new MockEvent();
        emitter.on('someName', listener);
        
        emitter.emit('someName', event);
        emitter.emit('someName', event);
        emitter.emit('someName', event);

        expect(listener).toHaveBeenCalledTimes(3);
        expect(listener).toHaveBeenCalledWith(event);
    });

    it('should be possible to be disposed and not emit events anymore', function() {
        type evMap = {'someName': MockEvent};
        const emitter = new EventEmitter<evMap>();
        const listener = vitest.fn();
        const event = new MockEvent();
        const disposable = emitter.on('someName', listener);
        
        emitter.emit('someName', event);
    

        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith(event);

        disposable.dispose();
        emitter.emit('someName', event);

        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith(event);
    });

    it('should be possible to remove a listener', () => {
        type evMap = {'someName': MockEvent};
        const emitter = new EventEmitter<evMap>();
        const listener = vitest.fn();
        const anotherListener = vitest.fn();
        const event = new MockEvent();
        emitter.on('someName', listener);
        emitter.on('someName', anotherListener);

        emitter.emit('someName', event);
    

        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith(event);
        expect(anotherListener).toHaveBeenCalledTimes(1);
        expect(anotherListener).toHaveBeenCalledWith(event);
        emitter.off('someName', listener);
        emitter.emit('someName', event);

        expect(listener).toHaveBeenCalledTimes(1);
        expect(anotherListener).toHaveBeenCalledTimes(2);


    });

    it('should be possible to remove all listeners for an event', () => {
        type evMap = {'someName': MockEvent};
        const emitter = new EventEmitter<evMap>();
        const listener = vitest.fn();
        const anotherListener = vitest.fn();
        const event = new MockEvent();
        emitter.on('someName', listener);
        emitter.on('someName', anotherListener);

        emitter.emit('someName', event);
    

        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith(event);
        expect(anotherListener).toHaveBeenCalledTimes(1);
        expect(anotherListener).toHaveBeenCalledWith(event);
        emitter.off('someName');
        emitter.emit('someName', event);

        expect(listener).toHaveBeenCalledTimes(1);
        expect(anotherListener).toHaveBeenCalledTimes(1);
    });

    it('should be possible to clear all listeners for all events', () => {
        type evMap = {'someName': MockEvent,
                      'someOtherName': MockEvent};
        const emitter = new EventEmitter<evMap>();
        const listener = vitest.fn();
        const anotherListener = vitest.fn();
        const event = new MockEvent();
        emitter.on('someName', listener);
        emitter.on("someOtherName", anotherListener);

        emitter.emit('someName', event);
        emitter.emit('someOtherName', event);
        
        
        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith(event);
        expect(anotherListener).toHaveBeenCalledTimes(1);
        expect(anotherListener).toHaveBeenCalledWith(event);
        
        emitter.clear();
        emitter.emit('someName', event);
        emitter.emit('someOtherName', event);

        expect(listener).toHaveBeenCalledTimes(1);
        expect(anotherListener).toHaveBeenCalledTimes(1);
    });

    it('should be possible to pause an emitter', () => {
        type evMap = {'someName': MockEvent};
        const emitter = new EventEmitter<evMap>();
        const listener = vitest.fn();
        const consoleMockWarn = vitest.spyOn(CoreLogger, 'warn').mockImplementation(() => {});
        const consoleMockDebug = vitest.spyOn(CoreLogger, 'debug').mockImplementation(() => {});
        const event = new MockEvent();
        emitter.on('someName', listener);
        emitter.emit('someName', event);
        emitter.pause();
        emitter.emit('someName', event);
        expect(listener).toHaveBeenCalledTimes(1);
        expect(consoleMockDebug).toHaveBeenCalledTimes(2);
        expect(consoleMockDebug).toHaveBeenLastCalledWith('EventEmitter: unnamed paused');
        expect(consoleMockWarn).toHaveBeenCalledTimes(1);
        expect(consoleMockWarn).toHaveBeenCalledWith('EventEmitter: unnamed is paused, not emitting someName');
    });
});