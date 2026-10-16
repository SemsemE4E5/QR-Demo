const V='att-v1',CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
const CDN=['https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js','https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.11.6/JsBarcode.all.min.js','https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.8/html5-qrcode.min.js','https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;700&display=swap'];
const HOSTS=['cdnjs.cloudflare.com','fonts.googleapis.com','fonts.gstatic.com'];
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(V);await c.addAll(CORE);await Promise.all(CDN.map(u=>fetch(new Request(u,{mode:'no-cors'})).then(r=>c.put(u,r)).catch(()=>{})));self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==V)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(r.mode==='navigate'){e.respondWith(fetch(r.url,{cache:'no-cache'}).then(x=>{const cp=x.clone();caches.open(V).then(c=>c.put('index.html',cp));return x}).catch(()=>caches.match('index.html')));return}
 if(u.origin===location.origin||HOSTS.includes(u.hostname))e.respondWith(caches.match(r).then(h=>{const n=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque')){const cp=x.clone();caches.open(V).then(c=>c.put(r,cp))}return x}).catch(()=>h);return h||n}))});
