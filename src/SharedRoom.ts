import redis, { RedisClient } from 'redis';
import Message from './Message';

class SharedRoom {
    private history: Array<Message>;
    private sub: RedisClient;

    constructor() {
        this.sub = redis.createClient(`redis://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}`);
        this.history = [];
        
        // Set up the redis client
        this.sub.subscribe('messages');

        this.sub.on('message', (channel: string, data:string) => {
            const parsed = JSON.parse(data);
            const message = new Message(parsed.message, new Date(parsed.timestamp));
            this.history.push(message);
        });
    }

    public getFullList() {
        return this.history;
    }

    public getFirstRecord() {
        return this.history[0];
    }

    public getLastRecord() {
        return this.history[this.history.length - 1];
    }

    public getLatestRecordTime() {
        return this.getLastRecord().timestamp;
    }
}

export = SharedRoom;
