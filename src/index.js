//_____   ____ _______    _______ ____    _      ____          _____  ______ _____  
//|  __ \ / __ \__   __|/\|__   __/ __ \  | |    / __ \   /\   |  __ \|  ____|  __ \ 
//| |__) | |  | | | |  /  \  | | | |  | | | |   | |  | | /  \  | |  | | |__  | |__) |
//|  ___/| |  | | | | / /\ \ | | | |  | | | |   | |  | |/ /\ \ | |  | |  __| |  _  / 
//| |    | |__| | | |/ ____ \| | | |__| | | |___| |__| / ____ \| |__| | |____| | \ \ 
//|_|     \____/  |_/_/    \_\_|  \____/  |______\____/_/    \_\_____/|______|_|  \_\                                                                          
// By Zffu - https://github.com/PotatoLoader
// The Core File of the Potato Manager's Module Loading System.

// Import stuff to dynamically load the files trough chattriggers.
const JSLoader = Java.type("com.chattriggers.ctjs.engine.langs.js.JSLoader")
const UrlModuleSourceProvider = Java.type("org.mozilla.javascript.commonjs.module.provider.UrlModuleSourceProvider")
const UrlModuleSourceProviderInstance = new UrlModuleSourceProvider(null, null)
const StrongCachingModuleScriptProviderClass = Java.type("org.mozilla.javascript.commonjs.module.provider.StrongCachingModuleScriptProvider")
let StrongCachingModuleScriptProvider = new StrongCachingModuleScriptProviderClass(UrlModuleSourceProviderInstance)
let CTRequire = new JSLoader.CTRequire(StrongCachingModuleScriptProvider)
const File = Java.type("java.io.File")
import {Module} from "./module"



// The core Potato's loading class.
class PotatoLoader {
    constructor(moduleId) {
        this.moduleId = moduleId;
        this.loadedFiles = [];
        this.folder = new File("./config/ChatTriggers/modules/" + this.moduleId + "/src/modules")
    }

    loadFile(path) {
        // Optimize by just returning the file if its already been loaded by CTRequire.
        if(this.loadedFiles.includes(path)) return require(path);
        this.loadedFiles.push(path);
        return CTRequire(path);
    }

    loadModules() {
        let modules = [];
        let dirs = this.folder.list();
     
        for(let i = 0; i < dirs.length; i++) {
            let pathName = dirs[i];
            if(pathName.includes(".")) return;

            try {
                let data = JSON.parse(FileLib.read(this.moduleId + "/src/modules/" + pathName + "/", "manifest.json"));
                if(data == null) {
                    return modules;
                }
                data.id = pathName;
                let module = loadModule("../modules/" + data.id + "/", data);
    
                modules.push(module);
            } catch(e) {
                ChatLib.chat("§8[§r§aZffu's Addons§r§8] §cCould not load modules! " + e);
            }
        }
        return modules;
    }
    loadModule(dir, manifest) {
        if(manifest["name"] == undefined || manifest["description"] == undefined || manifest["id"] == undefined || manifest["load"] == undefined || manifest["load"].length == 0) {
            ChatLib.chat("§8[§r§aZffu's Addons§r§8] §cCould not load module " + moduleId + ": Missing Manifest Properties")
            return;
        }
        
        var files = [];
    
        manifest["load"].forEach(file => {
            files.push(dir + file);
        })
    
        var module = new Module(manifest["name"], manifest["id"], manifest["description"], files);
    
        if(files.length > 0) {
            files.forEach(file => {
                loadFile(file);
            })
        }
    
        return module;
    }
}

module.exports = {
    PotatoLoader
}