
addEventListener("install", (event) => {
  const preCache = async () => {
    const cache = await caches.open("static-v1");
    console.log("service worker intalled after cached events");
    return cache.addAll(["/"]);
  };
  event.waitUntil(preCache());
});

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
