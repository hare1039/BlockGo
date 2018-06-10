declare var alertify: any;


interface render_info {
    x: number;
    y: number;
    who: number;
    stoneid: number;
    rotate: number;
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class backend {
    websocket: WebSocket;
    constructor(wss: string) {
        this.websocket = new WebSocket(wss);
        this.buffer = new Array<string>();
        this.ready = false;
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
        this.ready = true;
        this.send(JSON.stringify({
            cmd: "start",
            right: option.right,
            left: option.left
        }));
        this.sendBuffer();
        console.log(evt);
    }

    async sendBuffer() {
        for (let msg of this.buffer) {
            await sleep(80);
            this.send(msg);
        }
        this.buffer.length = 0;
    }

    async notice(str: string) {
        await sleep(30);
        alertify.alert(str);
    }

    onClose(evt: CloseEvent) {
        console.log(evt);
    }

    onMessage(evt: MessageEvent) {
        let dat = JSON.parse(evt.data);
        console.log(dat);
        switch (dat.cmd) {
            case "start":
                break;

            case "transfer":
                let event = new CustomEvent("render", {
                    detail: {
                        x: dat.x,
                        y: dat.y,
                        who: 2,
                        stoneid: dat.stone,
                        rotate: dat.rotate
                    }
                });

                document.getElementById("board").dispatchEvent(event);
                break;

            case "status":
                if (dat.status == "err") {
                    let event = new CustomEvent("revert", {
                        detail: {
                            err: dat.why,
                            origin: dat.origin
                        }
                    });
                    document.getElementById("board").dispatchEvent(event);
                    return;
                } else if (dat.status == "end") {
                    let stat = JSON.parse(dat.why);
                    this.notice("Winner: Player " + stat.winner.player + ", result: " + stat.winner.result.p1 + ":" + stat.winner.result.p2);
                    break;
                }
                break;
        }
    }

    onError(evt: ErrorEvent) {
        alert("error happened (see console log)");
        console.error(evt);
    }

    buffer: string[];
    ready: boolean;
    send = (message: string) => {
        if (!this.ready) {
            this.buffer.push(message);
        } else {
            this.websocket.send(message);
        }
    }
}

export { backend, render_info };
