//_____   ____ _______    _______ ____    _      ____          _____  ______ _____  
//|  __ \ / __ \__   __|/\|__   __/ __ \  | |    / __ \   /\   |  __ \|  ____|  __ \ 
//| |__) | |  | | | |  /  \  | | | |  | | | |   | |  | | /  \  | |  | | |__  | |__) |
//|  ___/| |  | | | | / /\ \ | | | |  | | | |   | |  | |/ /\ \ | |  | |  __| |  _  / 
//| |    | |__| | | |/ ____ \| | | |__| | | |___| |__| / ____ \| |__| | |____| | \ \ 
//|_|     \____/  |_/_/    \_\_|  \____/  |______\____/_/    \_\_____/|______|_|  \_\                                                                          
// By Zffu - https://github.com/PotatoLoader
// The Core File of the Potato Manager's Feature System (WIP).
// Also used for event handlers

class Feature {
    constructor() {
        // We directly store the manager in there for easier and faster access.
        this.manager = undefined;

        // Internal Properties
        this.id = undefined;
        this.enabled = false;

        // Display Properties
        this.display_name = display_name;
        this.description = description;
        
        // Event Handling Properties
        this.eventHandlers = {};
        this.customEventHandlers = {};
        this.forgeEventHandlers = {};
        this.zffuEventHandlers = {};
        this.dynamicEvents = new Set();
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }

    // Do not override those functions, if you want to do something at disabling or enabling, use the onDisable or onEnable function.
    disableFeature() {
        this.onDisable();
        
        this.eventHandlers = {};
        this.customEventHandlers = {};
        this.enabled = false;

        this.dynamicEvents.clear();
    }

    enableFeature(parent) {
        this.manager = parent;
        this.enabled = true;

        this.onEnable();
    }

    // Functions that can be overrided and gets triggered at feature disabling or enabling.
    onDisable() {}
    onEnable() {}
}

module.exports = {
    Feature
}