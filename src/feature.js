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
}

module.exports = {
    Feature
}