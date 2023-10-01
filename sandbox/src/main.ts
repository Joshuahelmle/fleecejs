
import { version, CoreLogger, ClientLogger, KeyBoard} from "fleecejs"; 

CoreLogger.trace("Hello World from FleeceJS version " + version, {foo: "bar"});
ClientLogger.trace("Hello World from FleeceJS version " + version);

const kb = new KeyBoard({});

kb.on("press", (e) => {
    console.log(e.getEventName());
});