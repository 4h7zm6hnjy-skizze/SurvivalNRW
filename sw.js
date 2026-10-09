/* Survival Deutschland 1.8.1 — single-file app shell; gepruefte lokale App-Dateien. */
const CACHE='survival-de-v1.8.1-single';
const MAP_CACHE='survival-de-licensed-map-tiles-v1'; // Vorher gespeicherte Karten beibehalten
const FILES=['./index.html','./version.json','./sw.js'];
const TILE_HOSTS=['sgx.geodatenzentrum.de','e.tiles.maps.eox.at'];
self.addEventListener('install', e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(FILES);await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{const names=await caches.keys();await Promise.all(names.filter(n=>n.startsWith('survival-nrw-v')||n.startsWith('survival-de-v')).filter(n=>n!==CACHE).map(n=>caches.delete(n)));await self.clients.claim()})()));
self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const url=new URL(e.request.url);
 if(TILE_HOSTS.includes(url.hostname)){
  e.respondWith((async()=>{const c=await caches.open(MAP_CACHE);const hit=await c.match(e.request);if(hit)return hit;return fetch(e.request)})());return;
 }
 if(url.origin!==self.location.origin)return;
 if(url.pathname.endsWith('/version.json')){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('./version.json')));return}
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(r.ok){caches.open(CACHE).then(c=>c.put('./index.html',r.clone())).catch(()=>{})}return r}).catch(()=>caches.match('./index.html')));return;
 }
 e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request)));
});
