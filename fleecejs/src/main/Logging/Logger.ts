import { trace, debug, info, warn, error, setLevel, LogLevelDesc, setDefaultLevel } from "loglevel"

enum Locales {
    deDe = "de-DE",
    enUs = 'en-US',
    enGb = 'en-GB',

}

class Logger {

    constructor(private name: string, defaultLevel: LogLevelDesc = 'trace', public locale: Locales = Locales.deDe) {
        setDefaultLevel(defaultLevel);
    }



    /**
     * Output trace message to console.
     * This will also include a full stack trace
     *
     * @param message any data to log to the console
     */
    public trace(...message: any[]) {
        trace(`[${new Date().toLocaleTimeString(this.locale)}]`, `${this.name.toUpperCase()} :`, message)
    }

    /**
         * Output debug/log message to console including appropriate icons
         *
         * @param message any data to log to the console
         */
    public debug(...message: any[]) {
        debug(`[${new Date().toLocaleTimeString(this.locale)}]`, `${this.name.toUpperCase()} :`, message)
    }

    /**
         * Output info message to console including appropriate icons
         *
         * @param message any data to log to the console
         */
    public info(...message: any[]) {
        info(`[${new Date().toLocaleTimeString(this.locale)}]`, `${this.name.toUpperCase()} :`, message)
    }

    /**
         * Output warn message to console including appropriate icons
         *
         * @param message any data to log to the console
         */
    public warn(...message: any[]) {
        warn(`[${new Date().toLocaleTimeString(this.locale)}]`, `${this.name.toUpperCase()} :`, message)
    }

    /**
         * Output error message to console including appropriate icons
         *
         * @param message any data to log to the console
         */
    public error(...message: any[]) {
        error(`[${new Date().toLocaleTimeString(this.locale)}]`, `${this.name.toUpperCase()} :`, message)
    }

    /**
         * This disables all logging below the given level, so that after a log.setLevel("warn") call log.warn("something")
         * or log.error("something") will output messages, but log.info("something") will not.
         *
         * @param level as a string, like 'error' (case-insensitive) or as a number from 0 to 5 (or as log.levels. values)
         * @param persist Where possible the log level will be persisted. LocalStorage will be used if available, falling
         *     back to cookies if not. If neither is available in the current environment (i.e. in Node), or if you pass
         *     false as the optional 'persist' second argument, persistence will be skipped.
         */
    public setLevel(level: LogLevelDesc) {
        setLevel(level)
    }

    
}

export const CoreLogger = new Logger('Fleece');
export const ClientLogger = new Logger('Client');

