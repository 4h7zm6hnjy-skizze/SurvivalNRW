'use strict';
/* Gebührenfreie Kartenquellen: BKG TopPlusOpen (dl-de/by-2-0) und EOX S2Cloudless 2016 (CC BY 4.0).
   Offline-Kacheln nur nach ausdrücklich ausgelöstem Download. Keine fremden JS-Bibliotheken. */
const V16_TILE_CACHE='survival-de-licensed-map-tiles-v1';
const V16_SOURCES={
 topo:{label:'Topografie',max:16,credit:'© BKG (2026) · dl-de/by-2-0', url:(z,x,y)=>`https://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web/default/WEBMERCATOR/${z}/${y}/${x}.png`},
 sat:{label:'Satellit (2016)',max:13,credit:'EOX / Copernicus 2016 · CC BY 4.0',url:(z,x,y)=>`https://e.tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/GoogleMapsCompatible/${z}/${y}/${x}.jpg`}
};
const V16_REGION_CENTERS={BW:[48.55,9.04],BY:[48.95,11.45],BE:[52.52,13.4],BB:[52.42,13.68],HB:[53.08,8.8],HH:[53.55,10.0],HE:[50.62,9.04],MV:[53.78,12.5],NI:[52.73,9.25],NW:[51.19,7.72],RP:[50.0,7.55],SL:[49.35,7.0],SN:[51.05,13.3],ST:[51.97,11.4],SH:[54.22,9.9],TH:[50.92,11.0]};
let V16_MAP={lat:51.19,lon:7.72,z:13,layer:'topo',gps:null,lastTileErrors:0,downloading:false,drag:null};
function v16X(lon,z){return (lon+180)/360*Math.pow(2,z)*256}
function v16Y(lat,z){let r=Math.max(-85.0511,Math.min(85.0511,lat))*Math.PI/180;return (1-Math.log(Math.tan(r)+1/Math.cos(r))/Math.PI)/2*Math.pow(2,z)*256}
function v16Lon(x,z){return x/(256*Math.pow(2,z))*360-180}
function v16Lat(y,z){return Math.atan(Math.sinh(Math.PI*(1-2*y/(256*Math.pow(2,z)))))*180/Math.PI}
function v16Clamp(){V16_MAP.lat=Math.max(-84,Math.min(84,V16_MAP.lat));V16_MAP.lon=Math.max(-179.9,Math.min(179.9,V16_MAP.lon));V16_MAP.z=Math.max(5,Math.min(V16_SOURCES[V16_MAP.layer].max,V16_MAP.z))}
function v16MapInit(){if(V16_MAP.initial)return;V16_MAP.initial=true;
 const regionId=currentRegion()?.id||'NW',center=V16_REGION_CENTERS[regionId]||V16_REGION_CENTERS.NW;
 V16_MAP.lat=center[0];V16_MAP.lon=center[1];
 try{const p=JSON.parse(localStorage.getItem('survival-de-map-v16')||'null');
  if(p&&p.regionId===regionId&&Number.isFinite(p.lat)&&Number.isFinite(p.lon)&&Number.isFinite(p.z)&&['topo','sat'].includes(p.layer))Object.assign(V16_MAP,{lat:p.lat,lon:p.lon,z:p.z,layer:p.layer});
 }catch{}v16Clamp();v16Save();}
function v16Save(){try{localStorage.setItem('survival-de-map-v16',JSON.stringify({lat:V16_MAP.lat,lon:V16_MAP.lon,z:V16_MAP.z,layer:V16_MAP.layer,regionId:currentRegion()?.id||'NW'}))}catch{}}
function v16MapPage(){const c=V16_REGION_CENTERS[currentRegion().id]||V16_REGION_CENTERS.NW;return `${pageTitle('Karte & Orientierung','Topografie und Satellit','Kostenlose, frei nutzbare Kartengrundlagen · Bereiche für die Offline-Nutzung gezielt speichern.')}
<div class="m16-panel">
 <div class="m16-tabs" role="group" aria-label="Kartenebene"><button type="button" data-m16="layer" data-layer="topo" class="m16-tab ${V16_MAP.layer==='topo'?'selected':''}">◈ Topografisch</button><button type="button" data-m16="layer" data-layer="sat" class="m16-tab ${V16_MAP.layer==='sat'?'selected':''}">▧ Satellit</button></div>
 <div class="m16-map" id="m16-map" aria-label="Interaktive Kartenansicht mit GPS-Standort" role="region"><div id="m16-tiles" class="m16-tiles"></div><div id="m16-marker" class="m16-marker" hidden><i></i></div>
  <div class="m16-top-chip" id="m16-net-chip">Karte lädt …</div>
  <div class="m16-map-controls"><button type="button" data-m16="locate" title="Meinen Standort anzeigen" aria-label="GPS-Standort">⌖</button><button data-m16="zoom-in" title="Vergrößern">+</button><button data-m16="zoom-out" title="Verkleinern">−</button></div>
  <div class="m16-map-bottom"><span id="m16-zoom">Zoomstufe ${V16_MAP.z}</span><span id="m16-map-credit">${V16_SOURCES[V16_MAP.layer].credit}</span></div>
 </div>
 <div class="m16-under-map"><strong id="m16-gps">GPS noch nicht aktiviert</strong><span id="m16-coords">Kartenzentrum: ${V16_MAP.lat.toFixed(5)}°, ${V16_MAP.lon.toFixed(5)}°</span><span id="m16-coverage" aria-live="polite">Offline-Abdeckung wird geprüft …</span></div>
 <div class="m16-action-row"><button type="button" class="btn" data-m16="locate">⌖ Standort ermitteln</button><button type="button" class="btn secondary" data-m16="gps-copy">Koordinaten kopieren</button></div>
</div>
<section class="m16-download card-like"><div class="m16-section-kicker">OFFLINE-KARTEN</div><h2>Kartenausschnitt speichern</h2><p>1. Kartenausschnitt auf der Karte einstellen oder GPS nutzen. 2. Gewünschten Durchmesser auswählen. 3. Beide Karten offline speichern. 4. Im Flugmodus beide Kartenarten testen. Andere Regionen und nicht gespeicherte Zoomstufen sind offline nicht verfügbar. Bei großen Regionen kann der Download wegen der Datenmenge abgelehnt werden. iOS kann die gespeicherten Daten bei Platzmangel löschen.</p>
<div class="m16-form-row"><label>Breitengrad<input type="number" step="any" id="m16-lat" value="${V16_MAP.lat.toFixed(5)}"></label><label>Längengrad<input type="number" step="any" id="m16-lon" value="${V16_MAP.lon.toFixed(5)}"></label><button class="btn secondary" data-m16="go-coords">Anzeigen</button></div>
<div class="m16-form-row"><label>Region um Kartenmitte<select id="m16-radius"><option value="1.5">3 km Durchmesser</option><option value="3" selected>6 km Durchmesser</option><option value="5">10 km Durchmesser</option></select></label><button type="button" class="btn" id="m16-download" data-m16="download">↓ Beide Karten offline speichern</button></div>
<div class="m16-progress" id="m16-progress" role="status" aria-live="polite">Bisher keine Kartenkacheln für diese Region heruntergeladen.</div><progress id="m16-progress-bar" value="0" max="100" hidden></progress>
<div class="m16-action-row"><button class="btn secondary" data-m16="offline-check">Speicher prüfen</button><button class="btn outline" data-m16="offline-clear">Gespeicherte Karten löschen</button></div>
<p class="m16-help"><b>Wichtig:</b> Für den ersten Download ist Internet nötig. Die Karten müssen in der HTTPS-Web-App gespeichert werden (nicht in einer lokalen HTML-Datei). Im Flugmodus werden nur zuvor gespeicherte Ausschnitte angezeigt. Satellitenbilder sind aus 2016/2017 und zeigen keine aktuellen Veränderungen. Topografie ist keine Höhenliniengarantie an jedem Ort. GPS funktioniert nur mit Ortungsfreigabe und Hardware-Unterstützung.</p>
</section>
<section class="m16-credits"><h3>Kartenquellen und Nutzungsrechte</h3><p><a target="_blank" rel="noopener noreferrer" href="https://www.bkg.bund.de">BKG</a> · <a target="_blank" rel="noopener noreferrer" href="https://www.govdata.de/dl-de/by-2-0">dl-de/by-2-0</a> · <a target="_blank" rel="noopener noreferrer" href="https://sgx.geodatenzentrum.de/web_public/gdz/datenquellen/datenquellen_topplusopen.html">Datenquellen</a>. © BKG, gebührenfrei mit Quellenangabe.</p><p><a target="_blank" rel="noopener noreferrer" href="https://s2maps.eu/#license">Sentinel-2 cloudless</a> by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2016 & 2017) · <a target="_blank" rel="noopener noreferrer" href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.</p><p>Die Karten werden nicht über einen kostenpflichtigen kommerziellen API-Dienst bezogen. Quellenangaben sind Lizenzpflichten und bleiben sichtbar.</p></section>
<div class="m16-more"><a href="#/bundeslaender">Alle 16 Bundesländer →</a><a href="#/gpx">GPX-Routen öffnen →</a><a href="#/karten-alt">Eigenes Kartenbild importieren →</a><a href="#/notfall">Notfall / 112 →</a></div>`}
function v16MapMount(){const m=document.getElementById('m16-map');if(!m)return;const stage=document.getElementById('m16-tiles');let start=null;
 m.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;start={x:e.clientX,y:e.clientY,px:v16X(V16_MAP.lon,V16_MAP.z),py:v16Y(V16_MAP.lat,V16_MAP.z)};m.setPointerCapture(e.pointerId)});
 m.addEventListener('pointermove',e=>{if(!start)return;stage.style.transform=`translate(${e.clientX-start.x}px,${e.clientY-start.y}px)`});
 const finish=e=>{if(!start)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;V16_MAP.lon=v16Lon(start.px-dx,V16_MAP.z);V16_MAP.lat=v16Lat(start.py-dy,V16_MAP.z);start=null;stage.style.transform='';v16Clamp();v16Save();v16Paint()};
 m.addEventListener('pointerup',finish);m.addEventListener('pointercancel',finish);
 m.addEventListener('wheel',e=>{e.preventDefault();V16_MAP.z+=e.deltaY<0?1:-1;v16Clamp();v16Save();v16Paint()},{passive:false});
 v16Paint();v16StorageStatus();
}
function v16Paint(){const stage=document.getElementById('m16-tiles'),map=document.getElementById('m16-map');if(!stage||!map)return;const w=map.clientWidth||650,h=map.clientHeight||420;
 const z=V16_MAP.z,n=Math.pow(2,z),cx=v16X(V16_MAP.lon,z),cy=v16Y(V16_MAP.lat,z);const x0=Math.floor((cx-w/2)/256),x1=Math.floor((cx+w/2)/256),y0=Math.floor((cy-h/2)/256),y1=Math.floor((cy+h/2)/256);let html='',num=0;
 for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++){if(y<0||y>=n)continue;const xx=(x%n+n)%n;const src=V16_SOURCES[V16_MAP.layer].url(z,xx,y);const left=x*256-cx+w/2,top=y*256-cy+h/2;html+=`<img class="m16-tile" src="${src}" alt="" draggable="false" loading="eager" style="left:${left}px;top:${top}px" onerror="this.classList.add('m16-tile-missing')">`;num++}
 stage.innerHTML=html;const marker=document.getElementById('m16-marker');if(marker){marker.hidden=!V16_MAP.gps;if(V16_MAP.gps){marker.style.left=(v16X(V16_MAP.gps.lon,z)-cx+w/2)+'px';marker.style.top=(v16Y(V16_MAP.gps.lat,z)-cy+h/2)+'px'}}
 const coords=document.getElementById('m16-coords');if(coords)coords.textContent=`Kartenzentrum: ${V16_MAP.lat.toFixed(5)}°, ${V16_MAP.lon.toFixed(5)}°`;
 for(let k of ['lat','lon']){const i=document.getElementById('m16-'+k);if(i&&document.activeElement!==i)i.value=V16_MAP[k].toFixed(5)}
 const credit=document.getElementById('m16-map-credit');if(credit)credit.textContent=V16_SOURCES[V16_MAP.layer].credit;
 const zoom=document.getElementById('m16-zoom');if(zoom)zoom.textContent='Zoom '+z+' · '+V16_SOURCES[V16_MAP.layer].label;
 for(let b of document.querySelectorAll('[data-m16="layer"]'))b.classList.toggle('selected',b.dataset.layer===V16_MAP.layer);
 const chip=document.getElementById('m16-net-chip');if(chip)chip.textContent=navigator.onLine?'Online · Kartendienst':'Offline · gespeicherte Karten';v16Coverage();
}
async function v16Coverage(){
 const info=document.getElementById('m16-coverage'),map=document.getElementById('m16-map');if(!info||!map)return;
 if(!('caches'in window)){info.textContent='Offline-Karte nur über die HTTPS-Web-App verfügbar.';return}
 const z=V16_MAP.z,cx=v16X(V16_MAP.lon,z),cy=v16Y(V16_MAP.lat,z),w=map.clientWidth||390,h=map.clientHeight||355;
 const urls=[];
 for(let x=Math.floor((cx-w/2)/256);x<=Math.floor((cx+w/2)/256);x++)for(let y=Math.floor((cy-h/2)/256);y<=Math.floor((cy+h/2)/256);y++){
  if(y>=0&&y<2**z)urls.push(V16_SOURCES[V16_MAP.layer].url(z,(x+2**z)%(2**z),y));
 }
 const view=V16_MAP.layer+':'+z+':'+V16_MAP.lat.toFixed(4)+':'+V16_MAP.lon.toFixed(4);
 info.dataset.view=view;
 try{const cache=await caches.open(V16_TILE_CACHE),matches=await Promise.all(urls.map(u=>cache.match(u)));
  if(info.dataset.view===view)info.textContent=`Offline-Abdeckung dieser Ansicht: ${matches.filter(Boolean).length}/${urls.length} Kacheln (${V16_SOURCES[V16_MAP.layer].label}, Zoom ${z}).`;
 }catch{info.textContent='Offline-Kartenspeicher nicht lesbar.'}
}
function v16CoordsFromGPS(){const g=document.getElementById('m16-gps');if(!navigator.geolocation){if(g)g.textContent='GPS vom Gerät nicht verfügbar.';return}if(g)g.textContent='Standort wird ermittelt …';navigator.geolocation.getCurrentPosition(p=>{let {latitude:lat,longitude:lon,accuracy}=p.coords;V16_MAP.gps={lat,lon,accuracy};V16_MAP.lat=lat;V16_MAP.lon=lon;V16_MAP.z=V16_MAP.layer==='topo'?14:13;v16Clamp();v16Save();v16Paint();if(g)g.textContent=`GPS: ${lat.toFixed(6)}°, ${lon.toFixed(6)}° · ±${Math.round(accuracy)} m`;},()=>{if(g)g.textContent='Standort nicht verfügbar – HTTPS/Standortfreigabe prüfen.'},{enableHighAccuracy:true,timeout:18000,maximumAge:15000})}
function v16Enumerate(layer,lat,lon,radiusKm){const max=V16_SOURCES[layer].max,lo=Math.max(-84,lat-radiusKm/111.2),hi=Math.min(84,lat+radiusKm/111.2),cos=Math.max(.1,Math.cos(lat*Math.PI/180));const west=lon-radiusKm/(111.2*cos),east=lon+radiusKm/(111.2*cos);const entries=[];for(let z=10;z<=max;z++){let x0=Math.floor(v16X(west,z)/256),x1=Math.floor(v16X(east,z)/256),y0=Math.floor(v16Y(hi,z)/256),y1=Math.floor(v16Y(lo,z)/256);for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++){let xx=(x+2**z)%(2**z);entries.push(V16_SOURCES[layer].url(z,xx,y))}}return entries}
async function v16StorageStatus(){const el=document.getElementById('m16-progress');if(!el||!('caches'in window))return;try{const c=await caches.open(V16_TILE_CACHE),keys=await c.keys();const topo=keys.filter(k=>k.url.includes('geodatenzentrum.de')).length,sat=keys.length-topo;const date=(localStorage.getItem('survival-de-tile-last')||'').match(/(\d{4})-(\d{2})-(\d{2})/);const link=date?` <a href="https://sgx.geodatenzentrum.de/web_public/gdz/datenquellen/datenquellen_topplusopen_${date[3]}.${date[2]}.${date[1]}.pdf" target="_blank" rel="noopener noreferrer">BKG-Datenquellen (Offline, ${date[3]}.${date[2]}.${date[1]})</a>`:'';el.innerHTML=`Gespeichert: <b>${topo} Topografie-Kacheln</b> · <b>${sat} Satelliten-Kacheln</b>.${link}`;v16Coverage();}catch(e){el.textContent='Offline-Speicher ist in diesem Browser nicht verfügbar.'}}
async function v16Download(){const btn=document.getElementById('m16-download'),el=document.getElementById('m16-progress'),progress=document.getElementById('m16-progress-bar');if(!btn||V16_MAP.downloading)return;const radius=Number(document.getElementById('m16-radius').value)||3;
 const urls=[...new Set([...v16Enumerate('topo',V16_MAP.lat,V16_MAP.lon,radius),...v16Enumerate('sat',V16_MAP.lat,V16_MAP.lon,radius)])];if(urls.length>600){el.textContent=`Kartenausschnitt zu groß (${urls.length} Kacheln). Bitte kleineren Bereich wählen.`;return}
 V16_MAP.downloading=true;btn.disabled=true;progress.hidden=false;progress.max=urls.length;progress.value=0;let ok=0,failed=0;el.textContent=`Bereite ${urls.length} Kartenteile vor …`;
 try{const cache=await caches.open(V16_TILE_CACHE);for(let i=0;i<urls.length;i+=5){await Promise.all(urls.slice(i,i+5).map(async u=>{try{let key=new Request(u,{mode:'no-cors'});if(await cache.match(key)){ok++;return}const res=await fetch(key,{cache:'no-store'});if(res.ok||res.type==='opaque'){await cache.put(key,res.clone());ok++}else failed++}catch(e){failed++}}));progress.value=Math.min(i+5,urls.length);el.textContent=`${progress.value}/${urls.length} bearbeitet · ${ok} gespeichert · ${failed} Fehler`}
 let today=new Date().toISOString().slice(0,10);if(ok)localStorage.setItem('survival-de-tile-last',`Letzter Abruf: ${today}. BKG / EOX 2016.`);el.textContent=`Fertig: ${ok} Kartenteile verfügbar, ${failed} fehlgeschlagen. Bitte zur Sicherheit Flugmodus-Test durchführen.`;v16StorageStatus()}
 catch(e){el.textContent='Offline-Speicherung nicht möglich: '+e.message}
 finally{V16_MAP.downloading=false;btn.disabled=false;progress.hidden=true}
}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-m16]');if(!b)return;e.preventDefault();e.stopPropagation();const a=b.dataset.m16;
 if(a==='layer'){V16_MAP.layer=b.dataset.layer;v16Clamp();v16Save();v16Paint()}
 if(a==='locate')v16CoordsFromGPS();
 if(a==='zoom-in'||a==='zoom-out'){V16_MAP.z+=a==='zoom-in'?1:-1;v16Clamp();v16Save();v16Paint()}
 if(a==='go-coords'){const lat=Number(document.getElementById('m16-lat')?.value),lon=Number(document.getElementById('m16-lon')?.value);if(!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>84||Math.abs(lon)>180){document.getElementById('m16-progress').textContent='Bitte gültige Koordinaten eingeben.';return}V16_MAP.lat=lat;V16_MAP.lon=lon;v16Save();v16Paint()}
 if(a==='download')await v16Download();
 if(a==='offline-check')await v16StorageStatus();
 if(a==='offline-clear'){if(!confirm('Nur die gespeicherten Kartenkacheln löschen? Notizen und Favoriten bleiben erhalten.'))return;await caches.delete(V16_TILE_CACHE);await v16StorageStatus();v16Paint()}
 if(a==='gps-copy'){const g=V16_MAP.gps;const s=g?`${g.lat.toFixed(6)}, ${g.lon.toFixed(6)}`:`${V16_MAP.lat.toFixed(6)}, ${V16_MAP.lon.toFixed(6)}`;try{await navigator.clipboard.writeText(s);const el=document.getElementById('m16-gps');if(el)el.textContent='Koordinaten kopiert: '+s}catch{const el=document.getElementById('m16-gps');if(el)el.textContent='Kopieren nicht möglich. Koordinaten: '+s}}
},true);
