const window = {};
// TODO: This import needs to be manually updated on each build — can it be automated?
self.importScripts("/build/manifest-0F478F03.js");

const manifest = window.__remixManifest;

const MANIFEST_CACHE = `assets-${manifest.version}`;


const START_URL = "/";

self.addEventListener("install", (event) => {
  console.log(`SW installed, manifest version ${manifest.version}`);
  const manifestUrls = parseUrlsFromManifest(manifest);
  event.waitUntil(
    caches.open(MANIFEST_CACHE).then((cache) => {
      cache
        .addAll([START_URL, ...manifestUrls])
        .then(() => {
          console.log(
            `${manifestUrls.length} asset URLs from manifest version ${manifest.version} cached`
          );
        })
        .catch((error) => {
          console.log(
            `FAILED to cache ${manifestUrls.length} asset URLs from manifest version ${manifest.version}:`,
            error
          );
        });
    })
  );
});




self.addEventListener("fetch", (event) => {
  
  event.respondWith(
    fetch(event.request).then((networkResponse) => {
      if(networkResponse.ok){
        console.log('ok');
        const clonedResponse = networkResponse.clone();
        
          caches.open('snip')
          .then((cache) => cache.put(event.request, clonedResponse))
        
        
      }
      return networkResponse;
    }).catch(async function () {
      return caches.match(event.request);

    }))
    
    
    
    
  });
      /*         .then(async function (response){
          if (response !== undefined) {
               return response;
          }else{
       
            return caches.match('/snippetOff');
          }
            
            })
         
    
    })
  );
});
*/
/*
self.addEventListener("fetch", (event) => {
  let url = new URL(event.request.url);
  let method = event.request.method;
  // any non GET request is ignored
  if (method.toLowerCase() !== "get") return;
  // If the request is for the favicons, fonts, or the built files (which are hashed in the name)
  if (url.pathname.startsWith("/")) {
    console.log("pathname fetched");
    event.respondWith(
      // we will open the assets cache
      caches.open("assets").then(async (cache) => {
        // if the request is cached we will use the cache
        let cacheResponse = await cache.match(event.request);
        if (cacheResponse) return cacheResponse;

        // if it's not cached we will run the fetch, cache it and return it
        // this way the next time this asset it's needed it will load from the cache
        let fetchResponse = await fetch(event.request);
        cache.put(event.request, fetchResponse.clone());

        return fetchResponse;
      })
    );
  }

  return;
});
*/

function parseUrlsFromManifest(manifest) {
  const modules = new Set();
  const chunks = new Set();
  const moduleObjects = [manifest.entry, ...Object.values(manifest.routes)];
  moduleObjects.forEach((obj) => {
    modules.add(obj.module);
    obj.imports?.forEach((chunk) => {
      chunks.add(chunk);
    });
  });
  return [...modules, ...chunks, manifest.url];
}