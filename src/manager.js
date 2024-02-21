//_____   ____ _______    _______ ____    _      ____          _____  ______ _____  
//|  __ \ / __ \__   __|/\|__   __/ __ \  | |    / __ \   /\   |  __ \|  ____|  __ \ 
//| |__) | |  | | | |  /  \  | | | |  | | | |   | |  | | /  \  | |  | | |__  | |__) |
//|  ___/| |  | | | | / /\ \ | | | |  | | | |   | |  | |/ /\ \ | |  | |  __| |  _  / 
//| |    | |__| | | |/ ____ \| | | |__| | | |___| |__| / ____ \| |__| | |____| | \ \ 
//|_|     \____/  |_/_/    \_\_|  \____/  |______\____/_/    \_\_____/|______|_|  \_\                                                                          
// By Zffu - https://github.com/PotatoLoader
// The Core File of the Potato Loader's Feature Manager System (WIP).

import { registerForge, unregisterForge } from "./utils/forge";

class FeatureManager {
    constructor() {
        // Context Properties
        this.parent = undefined;
        this.enabled = true;

        // Visual Properties
        this.prefix = "§8[§6Potato§8] "

        // Feature Properties
        this.features = {};
        this.manifests = {};

        // Event Handling Properties
        this.events = {};
        this.eventObjects = {};
        this.zffuEventHandlers = {};
        this.customEvents = {};
        this.forgeEvents = {};
        this.lastTrackedEventId = 0;
        this.lastChatTrackedEventId = 0;
        this.lastForgeTrackedEventId = 0;
        this.lastZffuTrackedEventId = 0;

        // Command Properties
        this.commandFunctions = {};

        // State Properties
        this.finishedLoading = false;
    }

    getId() {
        return "FeatureManager";
    }

    // Event Listening / Event Handler Registration Functions

    handleEvent(event, func, ctx) {
        if(!this.events[event]) {
            this.events[event] = [];
            this.startCatchingEvent(event);
        }

        let theEvent = {
            func: func,
            ctx: ctx,
            id: this.lastTrackedEventId++,
            event: event
        }
        
        this.events[event].push(theEvent);
        return theEvent;
    }

    handleZffuEvent(event, func, ctx) {
        if(!this.zffuEventHandlers[event]) {
            this.zffuEventHandlers[event] = [];
        }

        let theEvent = {
            func: func,
            ctx: ctx,
            id: this.lastZffuTrackedEventId++,
            event: event
        }

        this.zffuEventHandlers[event].push(theEvent);
        return theEvent;
    }

    handleChat(criteria, func, ctx) {
        let e = this.handleCustom("chat", func, ctx);
        e.trigger.setChatCriteria(criteria);
        return e;
    }

    handleSoundPlay(criteria, func, ctx) {
        let e = this.handleCustom("soundPlay", func, ctx);
        e.trigger.setCriteria(criteria);
        return e;
    }

    handleActionBar(criteria, func, ctx) {
        let e = this.handleCustom("actionBar", func, ctx);
        e.trigger.setChatCriteria(criteria);
        return e;
    }

    handleCommand(commandName, func, ctx, completions) {
        let e = this.handleCustom("command", func, ctx);
        if(completions) e.trigger.setTabCompletions(completions);
        e.trigger.setName(commandName, true);
        return e;
    }

    handleStep(isFps, interval, func, ctx) {
        let e = this.handleCustom("step", func, ctx);
        e.trigger[isFps ? "setFps" : "setDelay"](interval);
        return e;
    }


    handleCustom(type, func, ctx) {
        let id = this.lastChatTrackedEventId++;

        if(!func) throw new Error("Function cannot be null!");

        this.customEvents[id] = {
            func,
            ctx,
            trigger: register(type, (...args) => {
                try {
                    if(this.customEvents[id]?.eventT && !this.customEvents[id].eventT.enabled) return;

                    if(ctx.enabled) {
                        this.customEvents[id].func.call(ctx, ...(args || []))
                    }
                } catch(e) {
                    ChatLib.chat(this.prefix + "§cError while handling custom event id " + id + ": " + e)
                }
            })
        }

        return this.customEvents[id];
    }

    handleForge(event, func, priority, ctx) {
        let id = this.lastForgeTrackedEventId++;

        this.forgeEvents[id] = {
            func: func,
            ctx: ctx,
            trigger: registerForge(event, priority, (...args) => {
                try {
                    if(ctx.enabled) {
                        func.call(ctx, ...(args || []));
                    }
                } catch(e) {
                    ChatLib.chat(this.prefix + "§cError while handling forge event id " + id + ": " + e)
                }
            })
        }

        return this.forgeEvents[id];
    }

    unregisterForgeHandler(event) {
        if(!this.forgeEvents[event.id]) return
        unregisterForge(this.forgeEvents[event.id].trigger)
        delete this.forgeEvents[event.id];
    }

    unregisterCustomHandler(event) {
        event.trigger.unregister();
        delete this.customEvents[event.id];
    }

    unregisterEventHandler(event) {
        if(!this.events[event.event]) return;

        this.events[event.event] = this.events[event.event].filter((e) => {
            return e.id !== event.id
        })

        if(this.eventObjects[event.event].length === 0) {
            this.stopCatchingEvent(event);
            delete this.events[event.event];
        }
    }

    unregisterZffuHandler(event) {
        if(!this.zffuEventHandlers[event.event]) return;

        this.zffuEventHandlers[event.event] = this.zffuEventHandlers[event.event].filter((e) => {
            return e.id !== event.id
        })

        if(this.zffuEventHandlers[event.event].length === 0) {
            delete this.events[event.event];
        }
    }

    // Event Catching Functions
    startCatchingEvent(event) {
        if (this.eventObjects[event]) return;

        this.eventObjects[event] = register(event, (...args) => {
            this.triggerEvent(event, args);
        })
    }

    stopCatchingEvent(event) {
        if (!this.eventObjects[event]) return

        this.eventObjects[event].unregister()
        delete this.eventObjects[event]
        delete this.events[event]
    }

    registerFeature(feature) {
        this.features.set(feature.id, feature);
    }
}

module.exports = {
    FeatureManager
}