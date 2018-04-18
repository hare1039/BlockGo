
interface render_info {
    x: number;
    y: number;
    who: number;
    stoneid: number;
    rotate: number;
}


class backend {
    board_ref: any;
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
                    console.log(dat);
                    let event = new CustomEvent("revert", {
                        detail: {
                            err: dat.why,
                            origin: dat.origin
                        }
                    });
                    document.getElementById("board").dispatchEvent(event);
                    return;
                }
                else if (dat.status == "end") {
                    alert("Winner: " + dat.why);
                    break;
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

export { backend, render_info };
