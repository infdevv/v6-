
    function sendMessage(msg) {
        if (window.parent && window.parent !== window) {
            const targetOrigin = window.parent.location.origin || '*'; // Use parent origin or wildcard
            window.parent.postMessage(msg, targetOrigin);
        } else {
            console.error("Cannot send message: window.parent is undefined or the same as window.");
        }
    }
    

window.addEventListener("message", (event) => {
    if (event.origin != window.origin) {
        console.error("get rekt malware");
    }
    let msg = event.data;
    if (msg.type === "settingSet") {
        console.debug("recieved settingSet for " + msg.setting)
        settingSetCallback(msg);
    } else if (msg.type === "settingValue") {
        console.debug("recieved settingValue for " + msg.setting + " and value is " + msg.value)
        settingValueCallback(msg);
    } else if (msg.type === "reloadBookmarks") {
        console.debug("recieved reloadBookmarks");
        reloadBookmarksCallback(msg);
    } else if (msg.type === "historyDomainViewCounts") {
        console.debug("recieved historyDomainViewCounts - redacted because it may be giant"); // im scared of what bro means by this
        historyDomainViewCountsCallback(msg);
    } else if (msg.type === "reloadExtensions") {
        console.debug("recieved reloadExtensions");
        reloadExtensionsCallback(msg);
    } else if (msg.type === "extensionList") {
        console.debug("recieved extensionList - redacted because it may be giant");
        extensionListCallback(msg);
    } else if (msg.type === "branding") {
        console.debug("recieved branding");
        brandingCallback(msg);
    } else if (msg.type === "settingsMetadata") {
        console.debug("recieved settingsMetadata");
        settingsMetadataCallback(msg);
    }
})

function settingSetCallback() {}
function settingValueCallback() {}
function reloadBookmarksCallback() {}
function historyDomainViewCountsCallback() {}
function reloadExtensionsCallback() {}
function extensionListCallback() {}
function brandingCallback() {}
function settingsMetadataCallback() {}
