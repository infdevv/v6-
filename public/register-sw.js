"use strict";

/**
 * Distributed with Ultraviolet and compatible with most configurations.
 */
const stockSW = "sw.js";

/**
 * List of hostnames that are allowed to run service workers on http://
 */
const swAllowedHostnames = ["localhost", "127.0.0.1"];

/**
 * Global util
 * Used in 404.html and index.html
 */
async function registerSW() {
  if (!('serviceWorker' in navigator)) {
    throw new Error("Your browser doesn't support service workers.");
  }

  if (
    location.protocol !== "https:" &&
    !swAllowedHostnames.includes(location.hostname)
  ) {
    throw new Error("Service workers cannot be registered without https.");
  }

  try {
    // Ensure that __uv$config.prefix is defined
    if (typeof __uv$config !== 'undefined' && __uv$config.prefix) {
      await navigator.serviceWorker.register(stockSW, {
        scope: __uv$config.prefix,
      });

      function ultravioletdecode(string){
        return __uv$config.decodeUrl(string);
      }
    } else {
      throw new Error("__uv$config.prefix is not defined.");
    }
  } catch (error) {
    console.error("Service Worker registration failed:", error);
  }
}

// Optionally call the function immediately or at some event
registerSW();
