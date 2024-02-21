//_____   ____ _______    _______ ____    _      ____          _____  ______ _____  
//|  __ \ / __ \__   __|/\|__   __/ __ \  | |    / __ \   /\   |  __ \|  ____|  __ \ 
//| |__) | |  | | | |  /  \  | | | |  | | | |   | |  | | /  \  | |  | | |__  | |__) |
//|  ___/| |  | | | | / /\ \ | | | |  | | | |   | |  | |/ /\ \ | |  | |  __| |  _  / 
//| |    | |__| | | |/ ____ \| | | |__| | | |___| |__| / ____ \| |__| | |____| | \ \ 
//|_|     \____/  |_/_/    \_\_|  \____/  |______\____/_/    \_\_____/|______|_|  \_\                                                                          
// By Zffu - https://github.com/PotatoLoader
// The Core File of the Potato Manager's Module System (WIP).

class Module {
    constructor(display_name, id, description, files) {
        this.display_name = display_name;
        this.id = id;
        this.description = description;
        this.files = files;
    }
}

module.exports = {
    Module
}