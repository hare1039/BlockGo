var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define("stones", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var plane = {
        stone: {
            draw: function (args, board) {
                var xr = board.getX(args.x), yr = board.getY(args.y), sr = board.stoneRadius;
                if (board.obj_arr[args.x][args.y][0].c == WGo.B)
                    this.strokeStyle = "white";
                else
                    this.strokeStyle = "black";
                this.lineWidth = 3;
                this.beginPath();
                this.moveTo(xr - sr * 0.8, yr);
                this.lineTo(xr + sr * 0.5, yr);
                this.lineTo(xr + sr * 0.8, yr - sr * 0.25);
                this.moveTo(xr - sr * 0.4, yr);
                this.lineTo(xr + sr * 0.3, yr - sr * 0.6);
                this.moveTo(xr - sr * 0.4, yr);
                this.lineTo(xr + sr * 0.3, yr + sr * 0.6);
                this.stroke();
            }
        }
    };
    exports.plane = plane;
});
define("shapes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class basicShape {
        constructor() {
            this.dir = 0;
            this.rotate = () => {
                let newArr = [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ];
                let len = 4;
                for (let i = 0; i < len; i++) {
                    for (let j = 0; j < len; j++) {
                        newArr[i][j] = this.data[len - 1 - j][i];
                    }
                }
                this.data = newArr;
                this.shift_up_left();
                this.dir++;
            };
            this.rotateCounter = () => {
                this.rotate();
                this.rotate();
                this.rotate();
            };
            this.shift_up_left = () => {
                let shift_mapping = Object.assign({}, this.data);
                const len = 4;
                for (;;) {
                    let is_empty = true;
                    for (let i = 0; i < len; i++) {
                        if (shift_mapping[0][i] != 0) {
                            is_empty = false;
                            break;
                        }
                    }
                    if (is_empty == false) {
                        break;
                    }
                    else {
                        for (let i = 0; i < len; i++) {
                            shift_mapping[0][i] = shift_mapping[1][i];
                            shift_mapping[1][i] = shift_mapping[2][i];
                            shift_mapping[2][i] = shift_mapping[3][i];
                            shift_mapping[3][i] = 0;
                        }
                    }
                }
                for (;;) {
                    let is_empty = true;
                    for (let i = 0; i < len; i++) {
                        if (shift_mapping[i][0] != 0) {
                            is_empty = false;
                            break;
                        }
                    }
                    if (is_empty == false) {
                        break;
                    }
                    else {
                        for (let i = 0; i < len; i++) {
                            shift_mapping[i][0] = shift_mapping[i][1];
                            shift_mapping[i][1] = shift_mapping[i][2];
                            shift_mapping[i][2] = shift_mapping[i][3];
                            shift_mapping[i][3] = 0;
                        }
                    }
                }
            };
            this.paint = (board, x, y, what) => {
                let len = 4;
                for (let i = 0; i < len; i++) {
                    for (let j = 0; j < len; j++) {
                        let obj = Object.assign({
                            x: x + i,
                            y: y + j,
                        }, what);
                        if (this.data[j][i] == 1) {
                            board.addObject(obj);
                        }
                    }
                }
            };
        }
    }
    exports.basicShape = basicShape;
    class type1 extends basicShape {
        constructor() {
            super(...arguments);
            this.data = [
                [1, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        }
    }
    class type2 extends type1 {
    }
    class type3 extends basicShape {
        constructor() {
            super(...arguments);
            this.data = [
                [1, 0, 0, 0],
                [1, 1, 0, 0],
                [1, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        }
    }
    class type4 extends basicShape {
        constructor() {
            super(...arguments);
            this.data = [
                [1, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        }
    }
    class type5 extends basicShape {
        constructor() {
            super(...arguments);
            this.data = [
                [0, 1, 1, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        }
    }
    class type6 extends basicShape {
        constructor() {
            super(...arguments);
            this.data = [
                [1, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        }
    }
    class type7 extends basicShape {
        constructor() {
            super(...arguments);
            this.data = [
                [0, 0, 1, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        }
    }
    class type8 extends basicShape {
        constructor() {
            super(...arguments);
            this.data = [
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        }
    }
    class type9 extends basicShape {
        constructor() {
            super(...arguments);
            this.data = [
                [1, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
        }
    }
    var shapeArrP1 = [
        new type1,
        new type1,
        new type2,
        new type3,
        new type4,
        new type5,
        new type6,
        new type7,
        new type8,
        new type9
    ];
    exports.shapeArrP1 = shapeArrP1;
    var shapeArrP2 = [
        new type1,
        new type1,
        new type2,
        new type3,
        new type4,
        new type5,
        new type6,
        new type7,
        new type8,
        new type9
    ];
    exports.shapeArrP2 = shapeArrP2;
});
define("websocket", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    class backend {
        constructor(wss) {
            this.send = (message) => {
                if (!this.ready) {
                    this.buffer.push(message);
                }
                else {
                    this.websocket.send(message);
                }
            };
            this.websocket = new WebSocket(wss);
            this.buffer = new Array();
            this.ready = false;
            this.websocket.onopen =
                (evt) => { this.onOpen(evt); };
            this.websocket.onclose =
                (evt) => { this.onClose(evt); };
            this.websocket.onmessage =
                (evt) => { this.onMessage(evt); };
            this.websocket.onerror =
                (evt) => { this.onError(evt); };
        }
        onOpen(evt) {
            let option = JSON.parse(localStorage.getItem("player"));
            this.ready = true;
            this.send(JSON.stringify({
                cmd: "start",
                right: option.right,
                left: option.left
            }));
            this.sendBuffer();
            console.log(evt);
        }
        sendBuffer() {
            return __awaiter(this, void 0, void 0, function* () {
                for (let msg of this.buffer) {
                    yield sleep(80);
                    this.send(msg);
                }
                this.buffer.length = 0;
            });
        }
        notice(str) {
            return __awaiter(this, void 0, void 0, function* () {
                yield sleep(30);
                alertify.alert(str);
            });
        }
        onClose(evt) {
            console.log(evt);
        }
        onMessage(evt) {
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
                    }
                    else if (dat.status == "end") {
                        let stat = JSON.parse(dat.why);
                        this.notice("Winner: Player " + stat.winner.player + ", result: " + stat.winner.result.p1 + ":" + stat.winner.result.p2);
                        break;
                    }
                    break;
            }
        }
        onError(evt) {
            alert("error happened (see console log)");
            console.error(evt);
        }
    }
    exports.backend = backend;
});
define("record", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class record {
    }
    class game_records {
        constructor() {
            this.append = (r) => {
                this.records.push(r);
            };
            this.pop = () => {
                this.records.pop();
            };
            this.back = () => {
                return this.records[this.records.length - 1];
            };
            this.clear = () => {
                this.records.length = 0;
            };
            this.load = (json, len) => {
                if (len) {
                    this.records = json.slice(0, len);
                }
                else {
                    this.records = json;
                }
            };
            this.data = () => {
                return this.records;
            };
            this.save = () => {
                let a = document.createElement("a");
                a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(this.records, undefined, 4)));
                a.setAttribute("download", "block-go-" + moment().format("MMMM-Do-hh-mm-ss") + ".json");
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
            this.records = new Array();
        }
    }
    exports.game_records = game_records;
});
define("loading", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let thinkingImgList = [
        "./asset/loading/normal.gif",
        "./asset/loading/long.gif",
        "./asset/loading/sabaki.gif"
    ];
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    function randomLoadingImg() {
        return thinkingImgList[getRndInteger(0, thinkingImgList.length)];
    }
    exports.randomLoadingImg = randomLoadingImg;
});
define("app", ["require", "exports", "stones", "shapes", "websocket", "record", "loading"], function (require, exports, stones_1, shapes_1, websocket_1, record_1, loading_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let tool = document.getElementById("tool");
    let board;
    let back;
    let prevState;
    let record;
    let player_type = new Map();
    player_type.set("human", 1);
    player_type.set("MCTS", 2);
    player_type.set("random", 3);
    player_type.set("strategy", 4);
    let player;
    function filp_player() {
        player = (player == 1) ? 2 : 1;
    }
    function opponent(p) {
        return (p == 1) ? 2 : 1;
    }
    class playerInfo {
    }
    function currentPlayerInfo() {
        let previewItem = document.querySelector('input[name = "preview_' + player + '"]:checked');
        let info = new playerInfo;
        if (player == 1) {
            info.shape = shapes_1.shapeArrP1[Number(previewItem.value)];
            info.color = WGo.B;
        }
        else {
            info.shape = shapes_1.shapeArrP2[Number(previewItem.value)];
            info.color = WGo.W;
        }
        info.dom = previewItem;
        return info;
    }
    function replay(game) {
        for (let g of game.data()) {
            let shape;
            let color;
            if (g.player == 1) {
                shape = shapes_1.shapeArrP1[g.stone];
                color = WGo.B;
            }
            else {
                shape = shapes_1.shapeArrP2[g.stone];
                color = WGo.W;
            }
            for (let count = 0; count < g.rotate; count++) {
                shape.rotate();
            }
            shape.paint(board, g.x, g.y, { c: color });
            stoneDisplay(g.player, g.stone, false);
            back.send(JSON.stringify({
                cmd: "transfer",
                x: g.x,
                y: g.y,
                stone: g.stone,
                rotate: g.rotate,
                player: {
                    current: player_type.get("human"),
                    next: player_type.get("human")
                }
            }));
        }
    }
    function stoneDisplay(who, stoneid, show) {
        let dom = document.getElementById("preview_type" + stoneid.toString() + "_" + who.toString()).parentNode;
        if (show) {
            dom.style.visibility = "visible";
        }
        else {
            dom.style.visibility = "hidden";
        }
    }
    function onClick(x, y) {
        let info = currentPlayerInfo();
        prevState = board.getState();
        info.shape.paint(board, x, y, { c: info.color });
        let right = document.getElementById("rightSelect").value;
        let left = document.getElementById("leftSelect").value;
        back.send(JSON.stringify({
            cmd: "transfer",
            x: x,
            y: y,
            stone: Number(info.dom.value),
            rotate: info.shape.dir,
            player: {
                current: (player == 1) ? player_type.get(left) : player_type.get(right),
                next: (player == 1) ? player_type.get(right) : player_type.get(left)
            }
        }));
        record.append({
            player: player,
            x: x,
            y: y,
            stone: Number(info.dom.value),
            rotate: info.shape.dir
        });
        let displayLoading = false;
        if (opponent(player) == 2 && right != "human") {
            alertify.logPosition("bottom right");
            displayLoading = true;
        }
        else if (opponent(player) == 1 && left != "human") {
            alertify.logPosition("bottom left");
            displayLoading = true;
        }
        if (displayLoading) {
            alertify.maxLogItems(1).delay(0).log("<img width='300px' src='" + loading_1.randomLoadingImg() + "'>" +
                "<p>Thinking... Thinking...</p>");
        }
        stoneDisplay(player, Number(info.dom.value), false);
        filp_player();
    }
    function onWheel(x, y, event) {
        let previewItem = document.querySelector('input[name = "preview_' + player + '"]:checked');
        let info = currentPlayerInfo();
        if (event.deltaY > 0) {
            info.shape.rotate();
        }
        else {
            info.shape.rotateCounter();
        }
        onMousemove(x, y, event);
    }
    function onMousemove(x, y, event) {
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 13; j++) {
                board.removeObject({
                    x: i,
                    y: j,
                    type: stones_1.plane
                });
            }
        }
        let info = currentPlayerInfo();
        info.shape.paint(board, x, y, { type: stones_1.plane });
    }
    function onRender(place) {
        alertify.clearLogs();
        let stone = place.detail;
        console.log("stone", stone);
        for (let i = 0; i < stone.rotate; i++)
            shapes_1.shapeArrP2[stone.stoneid].rotate();
        let shape;
        let color;
        if (player == 1) {
            shape = shapes_1.shapeArrP1[stone.stoneid];
            color = WGo.B;
        }
        else {
            shape = shapes_1.shapeArrP2[stone.stoneid];
            color = WGo.W;
        }
        shape.paint(board, stone.x, stone.y, { c: color });
        record.append({
            player: player,
            x: stone.x,
            y: stone.y,
            stone: stone.stoneid,
            rotate: stone.rotate
        });
        stoneDisplay(player, stone.stoneid, false);
        filp_player();
    }
    function onRevert(place) {
        alertify.clearLogs();
        alertify.reset();
        console.log(prevState);
        if (record.back().player == 1)
            alertify.logPosition("bottom left");
        else
            alertify.logPosition("bottom right");
        alertify.error("No, no... You cannot place that block there");
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 13; j++) {
                for (let k = 0; k < prevState.objects[i][j].length; k++) {
                    if (prevState.objects[i][j][k].c == undefined) {
                        prevState.objects[i][j].splice(k, 1);
                    }
                }
            }
        }
        stoneDisplay(record.back().player, record.back().stone, true);
        record.pop();
        filp_player();
        board.restoreState(prevState);
    }
    function main() {
        board = new WGo.Board(document.getElementById("board"), {
            width: 600,
            size: 13
        });
        record = new record_1.game_records;
        back = new websocket_1.backend("wss://play.hare1039.nctu.me/docker");
        board.addEventListener("mousemove", onMousemove);
        board.addEventListener("click", onClick);
        board.addEventListener("wheel", _.debounce(onWheel, 400));
        document.getElementById("board").addEventListener("render", onRender);
        document.getElementById("board").addEventListener("revert", onRevert);
        let option = JSON.parse(localStorage.getItem("player"));
        if (option.left != "human") {
            player = 2;
        }
        else {
            player = 1;
        }
        document.getElementById("rightSelect").value = option.right;
        document.getElementById("leftSelect").value = option.left;
        let gamefile = localStorage.getItem("gamefile");
        if (gamefile) {
            let step = localStorage.getItem("stepNumber");
            record.load(JSON.parse(gamefile), parseInt(step));
            replay(record);
        }
        let button = document.getElementById("saveButton");
        button.onclick = function () {
            record.save();
        };
    }
    main();
});
//# sourceMappingURL=app.js.map