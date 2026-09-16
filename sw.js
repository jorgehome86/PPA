const CACHE='ppa-anac-final-1';
const ASSETS=['./','./index.html','./manifest.json','./sw.js','./ejsplash.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{const y=x.clone();caches.open(CACHE).then(c=>c.put(e.request,y));return x}).catch(()=>caches.match('./index.html'))));});