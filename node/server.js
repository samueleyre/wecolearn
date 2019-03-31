const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const get = require('http');
const gets = require('https');
const amqp = require('amqplib/callback_api');

const dotenv = require('dotenv');
const { URL }  = require('url');

const ERROR_API =  1;
const ERROR_AUTH =  2;
const ERROR_RABBIT =  3;
const ERROR_MALFORMED = 4;

const sockets = [];

dotenv.config();
io.on('connection', socket => {
    console.log('connect');
    socket.on('token', token => {
        if( -1 === sockets.findIndex( ( element ) => element.id === socket.id ) ){

            let unsub = () => {};

            ping(token).then( data => {
                const userId = JSON.parse(data).userId;
                console.log( userId );
                if( userId ) {
                    amqpCatch(userId + '', socket).then( unsubscribe => {
                        console.log(unsubscribe);
                        sockets.push( { id : socket.id , unsubscribe : unsubscribe })
                    }, (reject ) => {

                    });
                } else {
                    socket.emit('500', JSON.stringify({status : ERROR_AUTH , message : 'JWT INVALID' }));
                }
            }, error => {
                console.log(error);
                socket.emit('500', JSON.stringify({ status : ERROR_API , message : error }));
            });
        }
    });

    socket.on('disconnect', () => {
        console.log( 'socket id', socket.id);
        index = sockets.findIndex(( elem) => { socket.id === elem.id });

        if( index >= 0 ) {
            console.log( 'unsubscribe');
            sockets[index].unsubscribe();
            sockets.splice( index, 1 );
        }
    })
});

function find( socketId ) {
    sockets.findIndex ()
}

function ping( token ) {

    url = new URL(process.env.API_URL);

    let action = get;
    if( url.protocole === 'https:') {
        action = gets;
    }

    return new Promise( (resolve, reject) => {
        var options = {
            host: url.hostname,
            port: parseInt(url.port),
            path: '/api/ping',
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token },
            timeout: 10000
        };

        var str = '';

        var req = action.request(options, function(res) {
            //resolve( res );
            res.on('data', function (chunk) {
                str += chunk;

            });
            res.on('end', function() {
                resolve(str);
            });
        });

        req.on('error', (error) => {
            reject( error);
        });

        req.on('timeout', (error ) => {
            reject(error);
        });

        req.end();
    })
}

function amqpCatch( userId , socket) {

    return new Promise( (resolve , reject ) => {

        amqp.connect(process.env.RABBIT_URL, function(err, conn) {
            if( err) {

                socket.emit('500', JSON.stringify({ status : ERROR_RABBIT , message : err }));
                conn.close();
            }
            conn.createChannel(function(err, ch) {
                var ex = 'message';
                if( err) {
                    socket.emit('500', JSON.stringify({ status : ERROR_RABBIT , message : err }));
                    conn.close();
                }


                ch.assertExchange(ex, 'direct', {durable: false});

                ch.assertQueue('', {exclusive: true}, function(err, q) {

                    if( err) {
                        socket.emit('500', JSON.stringify({ status : ERROR_RABBIT , message : err }));
                        conn.close();
                    }

                    ch.bindQueue(q.queue, ex, userId);
                    console.log( 'listen for userId' + userId );
                    var element = ch.consume(q.queue, function(msg) {
                        socket.emit('message', msg.content.toString());
                    }, {noAck: true});

                    console.log( 'handshake' + userId );
                    socket.emit('handshake', JSON.stringify({success : true }));
                    resolve( () => { conn.close() });

                });
            });
        });

    })
}
http.listen(44);

