
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
        let option: any = JSON.parse(localStorage.getItem("player"));
        this.send(JSON.stringify({
            cmd: "start",
            right: option.right,
            left: option.left
        }));
        console.log(evt);
    }

    onClose(evt: CloseEvent) {
        console.log(evt);
    }

    onMessage(evt: MessageEvent) {
        let dat = JSON.parse(evt.data);
        switch (dat.cmd) {
            case "start":
                break;

            case "transfer":
                break;

            case "end":
                break;

            case "status":
                if (dat.status != "ok") {
                    console.log(dat);
                    return;
                }


                break;
        }
    }

    onError(evt: ErrorEvent) {
        alert("error happened (see console log)");
        console.error(evt);
    }

    send(message: string) {
        this.websocket.send(message);
    }
}

export { backend };
