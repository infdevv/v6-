let mode = localStorage.getItem("aboutbrowser_mode_override");

if (mode == null) { 
    mode = "1"; 
    console.warn("No override mode set, defaulting to mode 1"); 
}

// Store original localStorage methods for later use
const original_ls_getItem = window.localStorage.getItem.bind(window.localStorage);
const original_ls_setItem = window.localStorage.setItem.bind(window.localStorage);
const original_ls_removeItem = window.localStorage.removeItem.bind(window.localStorage);
const original_ls_clear = window.localStorage.clear.bind(window.localStorage);
const original_ss = window.sessionStorage;

// Store references to the original localStorage and sessionStorage
const original_ls = { ...window.localStorage };
const original_ss_copy = { ...window.sessionStorage };

function change_mode(new_mode) {
    mode = new_mode;
    original_ls_setItem("aboutbrowser_mode_override", mode);  // Use original setItem
    initializeMode();
}

function initializeMode() {
    if (mode == "1") {
        window.localStorage = original_ls;
        window.sessionStorage = original_ss;

        // No specific actions for cookies in mode 1
    } else if (mode === "2") {
        localStorage.clear();
        document.cookie.split(';').forEach(cookie => {
            document.cookie = cookie.split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        });
        original_ls_setItem("aboutbrowser_mode_override", mode);  // Ensure mode is saved in localStorage

        window.localStorage.setItem = function(key, value) {
            if (key === "aboutbrowser_mode_override") {
                original_ls_setItem(key, value); // Allow setting the mode in localStorage
            } else {
                sessionStorage.setItem(key, value);
            }
        };

        window.localStorage.getItem = function(key) {
            if (key === "aboutbrowser_mode_override") {
                return original_ls_getItem(key); // Allow getting the mode from localStorage
            } else {
                return sessionStorage.getItem(key);
            }
        };

        window.localStorage.removeItem = function(key) {
            if (key === "aboutbrowser_mode_override") {
                original_ls_removeItem(key);
            } else {
                sessionStorage.removeItem(key);
            }
        };

        window.localStorage.clear = function() {
            sessionStorage.clear();
        };

        window.localStorage.key = function(index) {
            return sessionStorage.key(index);
        };

        Object.defineProperty(window.localStorage, 'length', {
            get: function() {
                return sessionStorage.length;
            }
        });

    } else if (mode === "3" || mode === "4") {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(';').forEach(cookie => {
            document.cookie = cookie.split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        });

        original_ls_setItem("aboutbrowser_mode_override", mode);  // Ensure mode is saved in localStorage

        const customStorage = {
            _storage: {},
            _cookies: {},

            setItem(key, value) {
                this._storage[key] = String(value);
            },

            getItem(key) {
                return this._storage.hasOwnProperty(key) ? this._storage[key] : null;
            },

            removeItem(key) {
                delete this._storage[key];
            },

            clear() {
                this._storage = {};
            },

            key(index) {
                const keys = Object.keys(this._storage);
                return keys[index] || null;
            },

            get length() {
                return Object.keys(this._storage).length;
            },

            setCookie(key, value) {
                this._cookies[key] = String(value);
            },

            getCookie(key) {
                return this._cookies.hasOwnProperty(key) ? this._cookies[key] : null;
            },

            removeCookie(key) {
                delete this._cookies[key];
            },

            clearCookies() {
                this._cookies = {};
            },

            get cookieString() {
                return Object.entries(this._cookies).map(([key, value]) => `${key}=${value}`).join('; ');
            }
        };

        window.localStorage = {
            setItem: function(key, value) {
                if (key === "aboutbrowser_mode_override") {
                    original_ls_setItem(key, value); // Allow setting the mode in localStorage
                } else {
                    customStorage.setItem(key, value);
                }
            },
            getItem: function(key) {
                if (key === "aboutbrowser_mode_override") {
                    return original_ls_getItem(key); // Allow getting the mode from localStorage
                } else {
                    return customStorage.getItem(key);
                }
            },
            removeItem: function(key) {
                if (key === "aboutbrowser_mode_override") {
                    original_ls_removeItem(key); // Allow removing the mode from localStorage
                } else {
                    customStorage.removeItem(key);
                }
            },
            clear: function() {
                customStorage.clear();
            },
            key: function(index) {
                return customStorage.key(index);
            },
            get length() {
                return customStorage.length;
            }
        };

        window.sessionStorage = {
            setItem: function(key, value) {
                customStorage.setItem(key, value);
            },
            getItem: function(key) {
                return customStorage.getItem(key);
            },
            removeItem: function(key) {
                customStorage.removeItem(key);
            },
            clear: function() {
                customStorage.clear();
            },
            key: function(index) {
                return customStorage.key(index);
            },
            get length() {
                return customStorage.length;
            }
        };

        Object.defineProperty(document, 'cookie', {
            get: function() {
                return customStorage.cookieString;
            },
            set: function(cookie) {
                const [keyValuePair] = cookie.split(';');
                const [key, value] = keyValuePair.split('=');
                customStorage.setCookie(key.trim(), value.trim());
            }
        });

    }
    console.log("Override - Started managing at mode " + mode);
}

// Initial mode setup
initializeMode();

// Periodically check for mode changes
setInterval(() => {
    const currentMode = localStorage.getItem("aboutbrowser_mode_override");
    if (currentMode !== mode) {
        mode = currentMode;
        console.log("Override - Mode changed to " + mode);
        initializeMode();
    }
}, 1000);  // Check every second
