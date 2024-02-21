//_____   ____ _______    _______ ____    _      ____          _____  ______ _____  
//|  __ \ / __ \__   __|/\|__   __/ __ \  | |    / __ \   /\   |  __ \|  ____|  __ \ 
//| |__) | |  | | | |  /  \  | | | |  | | | |   | |  | | /  \  | |  | | |__  | |__) |
//|  ___/| |  | | | | / /\ \ | | | |  | | | |   | |  | |/ /\ \ | |  | |  __| |  _  / 
//| |    | |__| | | |/ ____ \| | | |__| | | |___| |__| / ____ \| |__| | |____| | \ \ 
//|_|     \____/  |_/_/    \_\_|  \____/  |______\____/_/    \_\_____/|______|_|  \_\                                                                          
// By Zffu - https://github.com/PotatoLoader
// A wrapper for Java classes.

export default class ClassWrapper {
    constructor(wrapped) {
        this.wrapped = wrapped;
        this.methods = new Map();
    }

    /**
     * Fetches a given method on the java class.
     * @param {String} method The method to fetch
     * @param {Array} args The args the method takes
     */
    getMethod(method, args = []) {
        if (this.methods.has(method)) return this.methods.get(method)

        let m = this.wrappedClass.getMethod(method, ...args)
        m.setAccessible(true)

        this.methods.set(method, this._callMethodFun(m))
        return this.methods.get(method)
    }

    _callMethodFun(m) {
        return function (...args) {
            return m.invoke(...args)
        }
    }
}
