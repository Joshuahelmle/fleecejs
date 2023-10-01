export * from "./main/Logging/Logger.ts";
export * from "./main/Input/KeyBoard.ts";
export * from "./main/Events/EventEmitter.ts";
export { FleeceEvent } from "./main/Events/Event.ts";

/**
 * Current Version
 */
export const version = "0.0.1";


export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
