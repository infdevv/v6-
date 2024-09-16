importScripts('./uv/uv.bundle.js');
importScripts('./uva/uv.config.js');
importScripts('./uv/uv.sw.js');

const uv = new UVServiceWorker();

self.addEventListener('fetch', event => {
    event.respondWith(
        (async ()=>{
            if(event.request.url.startsWith(location.origin + __uv$config.prefix)) {
                return await uv.fetch(event);
            }
            return await fetch(event.request);
        })()
    );
});