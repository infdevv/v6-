
function search(input, template) {
  try {
    // Check if the input is a valid URL
    return new URL(input).toString();
  } catch (err) {
    // Input was not a valid URL, continue to the next check
  }

  try {
    const search_engine_preference = localStorage.getItem("search_engine");
    let search_engine = "https://www.google.com/search?q="; // Default search engine
    const proxy_bridge = localStorage.getItem("proxy");
    const premium_status = localStorage.getItem("premium") === "true";
    let bridge = "";

    // Set search engine based on preference
    if (search_engine_preference) {
      switch (search_engine_preference) {
        case "Google":
          search_engine = "https://www.google.com/search?q=";
          break;
        case "DuckDuckGo":
          search_engine = "https://duckduckgo.com/?q=";
          break;
        case "Bing":
          search_engine = "https://www.bing.com/search?q=";
          break;
        case "Yahoo":
          search_engine = "https://search.yahoo.com/search?p=";
          break;
        case "Torry":
          search_engine = premium_status ? "https://www.torry.io/search/?type=oniontab&searchby_type=1&page=1&q=" : "https://www.google.com/search?q=";
          break;
        case "Startpage":
          search_engine = premium_status ? "https://www.startpage.com/do/search?query=" : "https://www.google.com/search?q=";
          break;
        case "Qwant":
          search_engine = premium_status ? "https://www.qwant.com/?t=web&q=" : "https://www.google.com/search?q=";
          break;
        case "Brave":
          search_engine = premium_status ? "https://search.brave.com/search?q=" : "https://www.google.com/search?q=";
          break;
        case "Google Scholar":
          search_engine = premium_status ? "https://scholar.google.com/scholar?q=" : "https://www.google.com/search?q=";
          break;
        default:
          search_engine = "https://www.google.com/search?q=";
          break;
      }
    }

    // Set proxy bridge based on preference and premium status
    if (premium_status && proxy_bridge) {
      switch (proxy_bridge) {
        case "Glitch EU Proxy":
          bridge = "https://v6-out.onrender.com/llaunch.html?url=";
          break;
        case "12FT":
          bridge = "https://12ft.io/";
          break;
        case "Archive.org/Wayback Machine":
          bridge = "https://web.archive.org/";
          break;
        case "Google Cache":
          bridge = "https://webcache.googleusercontent.com/search?q=cache:";
          break;
        default:
          bridge = "";
          break;
      }
    } else {
      console.log("No bridge available");
    }

    function buildSearchUrl(url, search_engine) {
      // Ensure the URL is a string
      url = url.toString();
      if (typeof url !== 'string') {
        throw new TypeError('url must be a string');
      }

      const is_url = url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
      if (!is_url) {
        // Treat input as a search query
        return search_engine + encodeURIComponent(url);
      } else {
        // Ensure the URL uses HTTPS
        if (url.startsWith("http://")) {
          url = url.replace("http://", "https://");
        }

        if (!url.startsWith("https://")) {
          url = "https://" + url;
        }

        // Apply the bridge if available
        if (bridge) {
          return bridge + encodeURIComponent(url);
        } else {
          return url;
        }
      }
    }

    // Attempt to build the search URL
    const url = buildSearchUrl(input, search_engine);

    // Attempt to validate the URL
    const validatedUrl = new URL(url);
    if (validatedUrl.hostname.includes(".")) {
      return validatedUrl.toString();
    }
  } catch (err) {
    // Input was not a valid URL
  }

  // If everything fails, treat the input as a search query
  return template.replace("%s", encodeURIComponent(input));
}

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("uv-form");
  const address = document.getElementById("uv-address");
  const searchEngine = document.getElementById("uv-search-engine");
  const error = document.getElementById("uv-error");
  const errorCode = document.getElementById("uv-error-code");

  let add = getURLParameter("url"); // Assuming getURLParameter is defined elsewhere
  address.value = add; // Change form URL value

  try {
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
      function ultravioletdecode(string){
        return __uv$config.decodeUrl(string);
      }
      await navigator.serviceWorker.register(stockSW, {
        scope: __uv$config.prefix,
      });
    } else {
      throw new Error("__uv$config.prefix is not defined.");
    }
  } catch (error) {
    console.error("Service Worker registration failed:", error);
  }
}

// Optionally call the function immediately or at some event
registerSW();

  } catch (err) {
    alert("Failed to register service worker.");
    console.warn("big problem chat" + err); // Using console.error to log the error as well
  }

  // Assuming search function is defined and returns a URL
  const url = search(address.value, searchEngine.value);

  let frame = document.getElementById("uv-frame");
  frame.style.display = "block";
  // Ensure __uv$config is correctly defined and accessible
  frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
});
