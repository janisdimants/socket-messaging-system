require('dotenv').config()

import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import User from './User';
import Message from './Message';
import SharedRoom from './SharedRoom';
import redis from 'redis';

const app = express();
const server = new http.Server(app);
const io = socketio(server);
const sub = redis.createClient(`redis://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}`);
const pub = redis.createClient(`redis://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}`);
const room = new SharedRoom();

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

// Set up the socket.io
io.on('connection', (socket) => {
    console.log('a user connected');
    // Create a user object for the new connection
    // And assign it to the socket object
    const user = new User(socket, room);

    socket.on('NewMessage', (data) => {
        const message = new Message(data.message, data.timestamp);
        
        pub.publish('messages', JSON.stringify(data));
    });

    socket.on('getFullList', () => {
        socket.emit('returnFullList', user.getSharedRoom().getFullList());
    });
    socket.on('getFirst', () => {
        socket.emit('returnFirst', [user.getSharedRoom().getFirstRecord()]);
    });
    socket.on('getLast', () => {
        socket.emit('returnLast', [user.getSharedRoom().getLastRecord()]);
    });
    socket.on('getLatest', () => {
        socket.emit('returnLatest', user.getSharedRoom().getLatestRecordTime());
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
