// step 2 =>  installation
//step 3 => activation

const CACHE_NAME = "cacheV1";
const staticFiles = ["/script.js", "/index.html", "/style.css", "/sw.js"];

// caching files
self.addEventListener("install", (e) => {
  const result = caches.open(CACHE_NAME).then((caches) => {
    console.log("cache ready");
    return caches.addAll(staticFiles);
  });
  e.waitUntil(result);
});

// delete unused caches
self.addEventListener("activate", (e) => {
  const result = caches
    .keys()
    .then((res) =>
      res.map((item) => (item !== CACHE_NAME ? caches.delete(item) : item))
    );

  e.waitUntil(result);
});

//  response to request from cache
self.addEventListener("fetch", (e) => {
  //skip for remote fetch
  if (!e.request.url.match(location.origin)) return;

  //*****= cache or fallback and update cache*****//
  //serve local fetch from cache
  let response = caches.open(CACHE_NAME).then((cache) => {
    return cache.match(e.request).then((isExist) => {
      //check if request was found in cache
      if (isExist) {
        console.log(`request ${e.request.url} served from cache `);
        return isExist;
      }
      // fetch from network and put it on cache
      return fetch(e.request).then((res) => {
        cache.put(e.request, res.clone());
        return res;
      });
    });
  });

  e.respondWith(response);
});
