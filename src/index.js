//_____   ____ _______    _______ ____    _      ____          _____  ______ _____  
//|  __ \ / __ \__   __|/\|__   __/ __ \  | |    / __ \   /\   |  __ \|  ____|  __ \ 
//| |__) | |  | | | |  /  \  | | | |  | | | |   | |  | | /  \  | |  | | |__  | |__) |
//|  ___/| |  | | | | / /\ \ | | | |  | | | |   | |  | |/ /\ \ | |  | |  __| |  _  / 
//| |    | |__| | | |/ ____ \| | | |__| | | |___| |__| / ____ \| |__| | |____| | \ \ 
//|_|     \____/  |_/_/    \_\_|  \____/  |______\____/_/    \_\_____/|______|_|  \_\                                                                          
// By Zffu - https://github.com/PotatoLoader
// The Core File of the Potato Manager's Feature Loading System.

// Import stuff to dynamically load the files trough chattriggers.
const JSLoader = Java.type("com.chattriggers.ctjs.engine.langs.js.JSLoader")
const UrlModuleSourceProvider = Java.type("org.mozilla.javascript.commonjs.module.provider.UrlModuleSourceProvider")
const UrlModuleSourceProviderInstance = new UrlModuleSourceProvider(null, null)
const StrongCachingModuleScriptProviderClass = Java.type("org.mozilla.javascript.commonjs.module.provider.StrongCachingModuleScriptProvider")
let StrongCachingModuleScriptProvider = new StrongCachingModuleScriptProviderClass(UrlModuleSourceProviderInstance)
let CTRequire = new JSLoader.CTRequire(StrongCachingModuleScriptProvider)
const File = Java.type("java.io.File")
import {Feature} from "./feature"



// The core Potato's loading class.
class PotatoLoader {
    constructor(moduleId) {
        this.moduleId = moduleId;
        this.loadedFiles = [];
        this.prefix = "§8[§6Potato§8] ";
        this.folder = new File("./config/ChatTriggers/modules/" + this.moduleId + "/src/features")
    }

    loadFile(path) {
        // Optimize by just returning the file if its already been loaded by CTRequire.
        if(this.loadedFiles.includes(path)) return require(path);
        this.loadedFiles.push(path);
        return CTRequire(path);
    }

    loadFeatures() {
        let features = [];
        let dirs = this.folder.list();
     
        for(let i = 0; i < dirs.length; i++) {
            let pathName = dirs[i];
            if(pathName.includes(".")) return;

            try {
                let data = JSON.parse(FileLib.read(this.moduleId + "/src/features/" + pathName + "/", "manifest.json"));
                if(data == null) {
                    return feature;
                }
                data.id = pathName;
                let feature = this.loadFeature("../features/" + data.id + "/", data);
    
                features.push(feature);
            } catch(e) {
                ChatLib.chat(this.prefix + "§cCould not load features! " + e);
            }
        }
        return features;
    }
    loadFeature(dir, manifest) {
        if(manifest["name"] == undefined || manifest["description"] == undefined || manifest["id"] == undefined || manifest["load"] == undefined || manifest["load"].length == 0) {
            ChatLib.chat(this.prefix + "§cCould not load feature " + moduleId + ": Missing Manifest Properties")
            return;
        }
        
        var files = [];
    
        manifest["load"].forEach(file => {
            files.push(dir + file);
        })
    
        var feature = new Feature(manifest["name"], manifest["id"], manifest["description"], files);
    
        if(files.length > 0) {
            files.forEach(file => {
                this.loadFile(file);
            })
        }
    
        return module;
    }
}

module.exports = {
    PotatoLoader
}