importScripts(
    '/static/workbox/workbox-sw.js',
  );
workbox.setConfig({
    // debug: true,
    modulePathPrefix:"/static/workbox/"
});

workbox.routing.registerRoute(
    new RegExp('/static/'),
    new  workbox.strategies.CacheFirst({
        cacheName: 'static',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 30,
                maxAgeSeconds: 12 * 60 * 60
            })
        ]
    })
);
workbox.routing.registerRoute(
    function (event) {
        // console.log(event.url.pathname)
        if (["/", '/favicon.png', '/style.css', '/sw.js'].indexOf(event.url.pathname) > -1) return true;
        if (event.url.pathname.indexOf('.html') > -1) return true;
        if (event.url.pathname.indexOf('/flow/') > -1) return true;
        if (event.url.pathname.indexOf('/autos/') > -1) return true;
        return false;
    },
    new  workbox.strategies.StaleWhileRevalidate({
        //cache名称
        cacheName: '缓存优先后台更新',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20
            })
        ]
    })
);
// workbox.routing.registerRoute(
//     function (event) {
//         // 需要缓存的HTML路径列表
//         if (event.url.host === 'covid.myquark.cn')
//             return true;
//         return false;

//     },
//     workbox.strategies.networkFirst({
//         cacheName: 'api',
//         plugins: [
//             new workbox.expiration.Plugin({
//                 maxEntries: 10
//             })
//         ]
//     })
// );