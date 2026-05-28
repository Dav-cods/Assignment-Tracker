import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', (event) => {
    console.log('Service worker installed');
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activated');
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'fiveMinutes') {
        const taskName = event.data.taskName;

        console.log('Notification has been sent');

        self.registration.showNotification('Assignment❗', {
            body: 'The task ' + '"' + taskName + '"' + ' is due in 5 minutes',
            icon: '/android-chrome-192x192.png',
        })
    }
})