const C='ppa-anac-v7';
const ASSETS=['./','./index.html','./config.js','./manifest.json','./sw.js','./ejsplash.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{const y=x.clone();if(e.request.method==='GET')caches.open(C).then(c=>c.put(e.request,y));return x}).catch(()=>caches.match('./index.html')))));
