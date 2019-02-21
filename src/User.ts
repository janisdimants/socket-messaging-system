import SharedRoom from './SharedRoom';
import { Socket } from 'socket.io';
import { RedisClient } from 'redis';

class User {
    private socketId: string;
    private clientIp: string;
    private sharedRoom: SharedRoom;

    constructor(socket: Socket, room: SharedRoom) {
        this.socketId = socket.id;
        this.clientIp = socket.handshake.address;
        this.sharedRoom = room;
    }

    public getId() {
        return this.socketId;
    }

    public getClientIp() {
        return this.clientIp;
    }

    public getSharedRoom() {
        return this.sharedRoom;
    }
}

export = User;
