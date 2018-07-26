var cacheID = "Restaurant Reviews Cached";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheID).then(cache => {
      return cache
        .addAll([
          "/",
      "./index.html",
      "./restaurant.html",
      "./css/styles.css",
      "./js/main.js",
      "./js/restaurant_info.js",
      "./js/dbhelper.js",
      "./data/restaurants.json",
      "./img/1.jpg",
      "./img/2.jpg",
      "./img/3.jpg",
      "./img/4.jpg",
      "./img/5.jpg",
      "./img/6.jpg",
      "./img/7.jpg",
      "./img/8.jpg",
      "./img/9.jpg",
      "./img/10.jpg"
      ])
        .catch(error => {
          console.log("Caches open failed: " + error);
        });
    })
  );
});

self.addEventListener("install", event => {
  event.waitUntil(
      caches.open(staticCacheName).then((cache) => {
          console.log(cache);
          return cache.addAll(urlsToCache);

      }).catch((error) => {
          console.log(error);
      })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
      caches.keys().then((cacheNames) => {
          return Promise.all(
              cacheNames.filter((cacheName) => {
                  return cacheName.startsWith("restaurant-") &&
                      cacheName != staticCacheName;
              }).map((cacheName) => {
                  return caches.delete(cacheName);
              })
          );
      })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
      caches.match(event.request).then((response) => {
          if (response) return response;
          return fetch (event.request);
      })
  );
});