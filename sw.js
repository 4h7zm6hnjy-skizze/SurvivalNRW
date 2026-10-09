/* Survival Deutschland 1.8.8: offline-first app shell and bounded caching of map tiles. */
const CACHE='survival-de-v1.8.8-single';
const MAP_CACHE='survival-de-licensed-map-tiles-v1'; // map tiles from prior releases remain usable
const SHELL=['./index.html','./version.json','./sw.js'];
const TILE_HOSTS=new Set(['sgx.geodatenzentrum.de','e.tiles.maps.eox.at']);
const MAX_SAVED_VIEW_TILES=1500;
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await cache.addAll(SHELL);
  await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const names=await caches.keys();
  await Promise.all(names.filter(name=>/^(survival-nrw-v|survival-de-v)/.test(name)&&name!==CACHE).map(name=>caches.delete(name)));
  await self.clients.claim();
})()));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(TILE_HOSTS.has(url.hostname)){
    event.respondWith((async()=>{
      const cache=await caches.open(MAP_CACHE);
      const saved=await cache.match(event.request);
      if(saved)return saved;
      try{
        const response=await fetch(event.request);
        if(response&&(response.ok||response.type==='opaque')){
          const copy=response.clone();
          event.waitUntil((async()=>{
            try{
              await cache.put(event.request,copy);
              const keys=await cache.keys();
              if(keys.length>MAX_SAVED_VIEW_TILES){
                const excess=keys.length-MAX_SAVED_VIEW_TILES;
                for(const old of keys.slice(0,excess))await cache.delete(old);
              }
            }catch(err){} // offline storage can be disabled or full
          })());
        }
        return response;
      }catch(err){return new Response('',{status:503,statusText:'Kartenkachel offline nicht gespeichert'});}
    })());
    return;
  }
  if(url.origin!==self.location.origin)return;
  if(url.pathname.endsWith('/version.json')){
    event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>caches.match('./version.json')));
    return;
  }
  if(event.request.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const response=await fetch(event.request,{cache:'no-store'});
        if(response.ok){
          event.waitUntil(caches.open(CACHE).then(cache=>cache.put('./index.html',response.clone())).catch(()=>{}));
        }
        return response;
      }catch(err){
        return await caches.match('./index.html')||new Response('Survival Deutschland: Offline-Daten fehlen. Einmal online öffnen.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
      }
    })());
    return;
  }
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request)));
});
