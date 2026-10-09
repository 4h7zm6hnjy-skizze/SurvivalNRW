/* Survival NRW 1.2.0 — full offline and versioned updates */
const CACHE='survival-nrw-v1.2.0';
const FILES=["./", "./index.html", "./app.js", "./data.js", "./styles.css", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./version.json", "./brennnessel.webp", "./brombeere.webp", "./erstehilfe.webp", "./fa\u0308hrten.webp", "./fell.webp", "./feuer.webp", "./filter.webp", "./fish.webp", "./foraging.webp", "./haselnuss.webp", "./heilkraut.webp", "./holunder.webp", "./kamille.webp", "./kleinwild.webp", "./knoten.webp", "./kochen.webp", "./lager.webp", "./laubhu\u0308tte.webp", "./lo\u0308wenzahn.webp", "./orientierung.webp", "./regen.webp", "./schafgarbe.webp", "./silberweide.webp", "./spitzwegerich.webp", "./unterstand.webp"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('survival-nrw-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 const u=new URL(event.request.url);
 // Updates must never be served silently from an old app cache.
 if(u.pathname.endsWith('/version.json')){event.respondWith(fetch(event.request,{cache:'no-store'}));return}
 // Prefer fresh HTML when online, but preserve offline navigation.
 if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).then(r=>{if(r.ok){const clone=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',clone)).catch(()=>{})}return r}).catch(()=>caches.match('./index.html')));return}
 event.respondWith(caches.match(event.request).then(c=>c||fetch(event.request).then(r=>{if(r.ok){const clone=r.clone();caches.open(CACHE).then(cache=>cache.put(event.request,clone)).catch(()=>{})}return r})));
});
