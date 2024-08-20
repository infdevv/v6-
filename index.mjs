import { createBareServer } from '@tomphttp/bare-server-node';
import { createServer } from 'node:http';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import httpProxy from 'http-proxy';

const bare = createBareServer('/bare/');
const fastify = Fastify();
const proxyServer = httpProxy.createProxyServer();

console.log("Fetching proxies...");

async function getProxies(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
            return data.data.map(proxy => ({
                proxy: `${proxy.ip}:${proxy.port}`,
                country: proxy.country
            }));
        } else {
            console.error('Unexpected JSON structure:', data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

const url = 'https://proxylist.geonode.com/api/proxy-list?speed=fast&limit=500&page=1&sort_by=lastChecked&sort_type=desc';

let proxies = [];

getProxies(url).then(fetchedProxies => {
    proxies = fetchedProxies;
});

// Serve static files using Fastify
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

fastify.register(fastifyStatic, {
    root: join(__dirname, 'static'),
    prefix: '/',
    decorateReply: false,
});

fastify.get('/vpn/*', async (req, reply) => {
    const countryCode = req.headers['glitch-vpn-country-code'];
    if (!countryCode) {
        reply.status(400).send('glitch-vpn-country-code header is missing');
        return;
    }

    const filteredProxies = proxies.filter(proxy => proxy.country === countryCode.toUpperCase());

    if (filteredProxies.length === 0) {
        reply.status(404).send('No proxies found for the specified country code');
        return;
    }

    const randomProxy = filteredProxies[Math.floor(Math.random() * filteredProxies.length)].proxy;

    delete req.headers['glitch-vpn-country-code'];

    proxyServer.web(req.raw, reply.raw, { target: `http://${randomProxy}` }, (err) => {
        if (err) {
            console.error('Proxy error:', err);
            reply.status(500).send('Proxy error');
        }
    });
});

const server = createServer();

server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
        return;
    }

    fastify.ready(err => {
        if (err) throw err;
        fastify.server.emit('request', req, res);
    });
});

server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req, socket, head)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

server.listen({
    port: process.env.PORT || 8080,
}, () => {
    console.log(`Server listening on port ${process.env.PORT || 8080}`);
});
