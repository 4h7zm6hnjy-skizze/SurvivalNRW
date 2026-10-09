/* Survival Deutschland 1.6.0 – App shell + lizenzkonforme Rasterkarten im manuellen Offline-Cache. */
const CACHE='survival-nrw-v1.6.0';
const MAP_CACHE='survival-de-licensed-map-tiles-v1';
const FILES=["./", "./regen.webp", "./wild-vogel.webp", "./haselnuss.webp", "./fish.webp", "./kochen.webp", "./fell.webp", "./brennnessel.webp", "./fa\u0308hrten.webp", "./knot-bund.webp", "./map_v16.js", "./LICENSE-KARTEN.txt", "./wild-hase.webp", "./README.txt", "./manifest.webmanifest", "./knot-rund.webp", "./kamille.webp", "./shelter-leaf.webp", "./index.html", "./styles.css", "./filter.webp", "./orientierung.webp", "./app.js", "./v13_gpx.js", "./shelter-bed.webp", "./feuer.webp", "./regions_data.js", "./knoten.webp", "./erstehilfe.webp", "./lo\u0308wenzahn.webp", "./lager.webp", "./v15_features.js", "./wild-reh.webp", "./heilkraut.webp", "./icon-512.png", "./wild-schwein.webp", "./brombeere.webp", "./knot-spann.webp", "./knot-achter.webp", "./data.js", "./v13_data.js", "./icon-192.png", "./schafgarbe.webp", "./knoten_data.js", "./foraging.webp", "./unterstand.webp", "./knot-palstek.webp", "./laubhu\u0308tte.webp", "./shelter-tarp.webp", "./spitzwegerich.webp", "./kleinwild.webp", "./silberweide.webp", "./holunder.webp", "./shelter-emergency.webp", "./modern_v16.css", "./version.json", "./knot-mastwurf.webp", "./v15_mapdata.js", "./sw.js"];
const TILE_HOSTS=['sgx.geodatenzentrum.de','e.tiles.maps.eox.at'];
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);const out=await Promise.allSettled(FILES.map(x=>c.add(x)));const failed=out.map((r,i)=>r.status==='rejected'?FILES[i]:null).filter(Boolean);if(failed.length)console.warn('Dateien nicht zwischengespeichert',failed);await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{await Promise.all((await caches.keys()).filter(k=>k.startsWith('survival-nrw-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const url=new URL(e.request.url);
 if(TILE_HOSTS.includes(url.hostname)){
   e.respondWith((async()=>{const c=await caches.open(MAP_CACHE);const hit=await c.match(e.request);if(hit)return hit;try{const res=await fetch(e.request);return res}catch(_){return Response.error()}})());return;
 }
 if(url.origin!==self.location.origin)return;
 if(url.pathname.endsWith('/version.json')){e.respondWith(fetch(e.request,{cache:'no-store'}));return}
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp)).catch(()=>{})}return r}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{})}return r})))
});
