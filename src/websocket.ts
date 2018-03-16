
class backend {

    websocket: WebSocket;
    constructor(wss: string) {
        this.websocket = new WebSocket(wss);
        this.websocket.onopen =
            (evt: Event) => { this.onOpen(evt); };
        this.websocket.onclose =
            (evt: CloseEvent) => { this.onClose(evt); };
        this.websocket.onmessage =
            (evt: MessageEvent) => { this.onMessage(evt); };
        this.websocket.onerror =
            (evt: ErrorEvent) => { this.onError(evt); };
    }


    onOpen(evt: Event) {
        console.log(evt);
    }

    onClose(evt: CloseEvent) {
        console.log(evt);
    }

    onMessage(evt: MessageEvent) {
        console.log(evt);
    }

    onError(evt: ErrorEvent) {
        console.log(evt);
    }

    send(message: string) {
        this.websocket.send(message);
    }
}

export { backend };
