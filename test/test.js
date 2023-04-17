const assert = require('chai').assert;
const io = require('socket.io-client');
const serverUrl = 'http://localhost:3001';

describe('Socket.io test', function(){
    let client1, client2;
    before(function(done){
        //Connect to the server
        client1  = io.connect(serverUrl);
        client2 = io.connect(serverUrl);
        done();
    });
    after(function(done){
        //disconnect form server
        client1.disconnect();
        client2.disconnect();
        done();
    });
    it('Should be able to send and receive message', function(done){
        client1.emit('message', 'Hello World!');
        client2.on('message', function(msg) {
            assert.equal(msg, 'Hello World!');
            done();
        });
    });
});