var CACHE_NAME = 'my-web-app-cache';
var urlsToCache = [
  '/',
  '/index.html',
  '/static/js/main.1ce59033.chunk.js',
  '/static/js/1.447283ad.chunk.js',
  '/static/js/runtime~main.229c360f.js',
  '/static/css/main.71c1668d.chunk.css',
  'https://api.adminca.com.ua/api/'
];

self.addEventListener('install', function (event) {
  // event.waitUntil принимает промис для того, чтобы узнать,
  // сколько времени займёт установка, и успешно
  // или нет она завершилась.
  event.registerForeignFetch({
    scopes: [self.registration.scope], // or some sub-scope
    origins: [ '*' ] // or ['https://example.com']
  });
  console.log('Install sw');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  console.log(event.request);
  event.respondWith(
    // Этот метод анализирует запрос и
    // ищет кэшированные результаты для этого запроса в любом из
    // созданных сервис-воркером кэшей.
    caches.match(event.request)
      .then(function (response) {
        // если в кэше найдено то, что нужно, мы можем тут же вернуть ответ.
        if (response) {
          return response;
        }

        // Клонируем запрос. Так как объект запроса - это поток,
        // обратиться к нему можно лишь один раз. 
        // При этом один раз мы обрабатываем его для нужд кэширования,
        // ещё один раз он обрабатывается браузером, для запроса ресурсов, 
        // поэтому объект запроса нужно клонировать.
        var fetchRequest = event.request.clone();

        // В кэше ничего не нашлось, поэтому нужно выполнить загрузку материалов,
        // что заключается в выполнении сетевого запроса и в возврате данных, если
        // то, что нужно, может быть получено из сети.
        return fetch(fetchRequest).then(
          function (response) {
            // Проверка того, получили ли мы правильный ответ
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Клонирование объекта ответа, так как он тоже является потоком.
            // Так как нам надо, чтобы ответ был обработан браузером,
            // а так же кэшем, его нужно клонировать,
            // поэтому в итоге у нас будет два потока.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function (cache) {
                // Добавляем ответ в кэш для последующего использования.
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
})

