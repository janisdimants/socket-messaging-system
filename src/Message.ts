class Message {
    private readonly _text: string;
    private readonly _timestamp: Date;

    constructor(text?: string, timestamp?: Date) {
        this._text = text || 'No message';
        this._timestamp = timestamp || new Date();
    }

    public get text() {
        return this._text;
    }

    public get timestamp() {
        return this._timestamp;
    }
}

export = Message;
