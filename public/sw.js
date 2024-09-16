importScripts('./uv/uv.bundle.js');
importScripts('./uva/uv.config.js');
importScripts('./uv/uv.sw.js');
importScripts('./cores/dynamic/config.js');
importScripts('./cores/dynamic/worker.js');

const uv = new UVServiceWorker();
const dynamic = new Dynamic();

self.addEventListener('fetch', event => {
    event.respondWith(
        (async ()=>{
            if(event.request.url.startsWith(location.origin + __uv$config.prefix)) {
                return await uv.fetch(event);
            }

            if (await dynamic.route(event)) {
                return await dynamic.fetch(event);
            }

            return await fetch(event.request);
        })()
    );
});
