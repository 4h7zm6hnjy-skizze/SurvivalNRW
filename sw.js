/* Survival NRW 1.1.0 – static cache for offline use */
const CACHE='survival-nrw-v1.1.0';
const FILES=["./", "./index.html", "./app.js", "./data.js", "./styles.css", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./assets/brennnessel.webp", "./assets/brombeere.webp", "./assets/erstehilfe.webp", "./assets/fell.webp", "./assets/feuer.webp", "./assets/filter.webp", "./assets/fish.webp", "./assets/foraging.webp", "./assets/fährten.webp", "./assets/haselnuss.webp", "./assets/heilkraut.webp", "./assets/holunder.webp", "./assets/kamille.webp", "./assets/kleinwild.webp", "./assets/knoten.webp", "./assets/kochen.webp", "./assets/lager.webp", "./assets/laubhütte.webp", "./assets/löwenzahn.webp", "./assets/orientierung.webp", "./assets/regen.webp", "./assets/schafgarbe.webp", "./assets/silberweide.webp", "./assets/spitzwegerich.webp", "./assets/unterstand.webp"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('survival-nrw-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  event.respondWith(caches.match(event.request).then(x=>x||fetch(event.request).then(res=>{
     if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(event.request,copy)).catch(()=>{});}return res;
  })).catch(()=>event.request.mode==='navigate'?caches.match('./index.html'):Response.error()));
});
