importScripts('workbox/workbox-sw.js');

const VERSION = 'v7';

workbox.setConfig({
    debug: true,
    modulePathPrefix: 'workbox/'
});

if(workbox) {
    console.log('INFO Workbox loaded');
}

//workbox.skipWaiting();
//workbox.clientsClaim();

workbox.precaching.precacheAndRoute([]);

/*
workbox.routing.registerRoute(
    new RegExp('index\\.html'),
    new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('(.*)\\.js'),
    new workbox.strategies.CacheFirst()
);
workbox.routing.registerRoute(
    new RegExp('(.*)\\.eot'),
    new workbox.strategies.CacheFirst()
);
workbox.routing.registerRoute(
    new RegExp('(.*)\\.svg'),
    new workbox.strategies.CacheFirst()
);
workbox.routing.registerRoute(
    new RegExp('(.*)\\.ttf'),
    new workbox.strategies.CacheFirst()
);
workbox.routing.registerRoute(
    new RegExp('(.*)\\.woff'),
    new workbox.strategies.CacheFirst()
);
workbox.routing.registerRoute(
    new RegExp('(.*)\\.woff2'),
    new workbox.strategies.CacheFirst()
);
workbox.routing.registerRoute(
    new RegExp('(.*)\\.css'),
    new workbox.strategies.CacheFirst()
);
workbox.routing.registerRoute(
    new RegExp('assets'),
    new workbox.strategies.CacheFirst()
);
workbox.routing.registerRoute(
    new RegExp('svg'),
    new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('(.*)\\.jpg'),
    new workbox.strategies.CacheFirst()
);
*/
workbox.routing.registerRoute(
    new RegExp('/$'),
    new workbox.strategies.CacheFirst()
);


self.addEventListener('push', async function(e) {
    e.waitUntil(
        sendMessageIfWindowIsVisible( e )
    );
});

self.addEventListener('notificationclick', function(e) {
    e.waitUntil(openNewWindow(e));
    e.notification.close();
});

var openNewWindow = ( e ) => {
    return new Promise( resolve => {
        clients.matchAll().then(function(clis) {
            var client = clis.find(function(c) {
                c.visibilityState === 'visible';
            });
            console.log( e.notification );
            if (client !== undefined) {
                client.navigate( e.notification.tag + '/dashboard/discussion').then(( data ) => {
                    client.focus().then( ( onFocus ) => {
                        resolve( onFocus );
                    })
                });
            } else {
                // there are no visible windows. Open one.
                clients.openWindow( e.notification.tag + '/dashboard/discussion').then( data => {
                    e.notification.close().then( onClose => {
                        resolve(onClose);
                    })
                });
            }
        });
    });
}



var sendMessageIfWindowIsVisible = ( e ) => {
    return new Promise( (resolve , reject ) => {
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(( c ) => {

            clientIsVisible = false;

            for (var i = 0; i < c.length; i++) {
                const windowClient = c[i];
                if (windowClient.visibilityState === "visible") {
                    clientIsVisible = true;
                    break;
                }
            }
            const data = e.data.json();

            if( clientIsVisible ) {
                  //broadcast message

                // todo : useful ?
                  // const channel = new BroadcastChannel('sw-messages');
                  // channel.postMessage(JSON.stringify(data.message));
                  // resolve( true );
                } else {
                    var body = data.message.message;
                    var options = {
                        body: body,
                        icon: 'assets/logo/wecolearn.png',
                        vibrate: [100, 50, 100],
                        data: {
                            dateOfArrival: Date.now(),
                            primaryKey: 1
                        },
                        tag : data.host
                    };

                    self.registration.showNotification(data.message.senderName, options ).then(( onNotif ) => {
                        // const channel = new BroadcastChannel('sw-messages');
                        // channel.postMessage(JSON.stringify(data.message));
                        resolve( onNotif );
                    })
                }
        });

    });
}
