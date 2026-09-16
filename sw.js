const C='ppa-anac-v12-open';
const ASSETS=['./','./index.html','./config.js?v=12','./manifest.json','./sw.js','./ejsplash.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k!==C).map(k=>caches.delete(k))
  )).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(
    fetch(e.request).then(x=>{
      const y=x.clone();
      caches.open(C).then(c=>c.put(e.request,y));
      return x;
    }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html')))
  );
});
