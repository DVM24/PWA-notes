importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    new workbox.strategies.NetworkFirst()
);
workbox.routing.registerRoute(
    // Cache CSS files.
    /\.css$/,
    // Use cache but update in the background.
    new workbox.strategies.StaleWhileRevalidate({
        // Use a custom cache name.
        cacheName: 'css-cache',
    })
);

// function getRandomInt(min, max) {//     return Math.floor(Math.random() * (max - min)) + min;
// }
workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '3836776' },
]);
workbox.routing.registerRoute(
    // Cache image files.
    new RegExp('/\.(?:png|jpg|jpeg|svg|gif)$/'),
    // Use the cache if it's available.
    new workbox.strategies.NetworkFirst({
        // Use a custom cache name.
        cacheName: 'image-cache',
        plugins: [
            new workbox.expiration.Plugin({
                // Cache only 20 images.
                maxEntries: 20,
                // Cache for a maximum of a week.
                maxAgeSeconds: 7 * 24 * 60 * 60,
            })
        ],
    })
);
workbox.routing.registerRoute(
    /(.*)action=getNote\&name=(.*)/,
    new workbox.strategies.NetworkFirst({
        cacheName: 'stories3',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
        ],

    }),
);
workbox.routing.registerRoute(
    /(.*)action=getNotes(.*)/,
    new workbox.strategies.NetworkFirst({
        cacheName: 'stories2',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
        ],

    }),
);