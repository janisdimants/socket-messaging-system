import redis from 'redis';

class RedisClient {
    public client: redis.RedisClient;

    constructor(user: string, password: string, host: string, port: string) {
        this.client = redis.createClient(`redis://${user}:${password}@${host}:${port}`);
        this.initializeRedis();
    }

    private initializeRedis() {
        this.client.subscribe('messages');

        this.client.on('message', (channel: string, message:string) => {
            message = JSON.parse(message);

            console.log(message);
        })
    }
}

export = RedisClient;