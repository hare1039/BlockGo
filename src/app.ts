declare var WGo: any;
declare var _: any;


import { plane } from "./stones";
import { shapeArrP1, shapeArrP2 } from "./shapes";
import { backend, render_info } from "./websocket";
import { game_records } from "record";


let tool = document.getElementById("tool") as HTMLInputElement;
let board: any;
let back: any;
let prevState: any;
let record: game_records;

let player: number;
function filp_player() {
    player = (player == 1) ? 2 : 1;
}

class playerInfo {
    shape: typeof shapeArrP1[0];
    color: typeof WGo.B;
    dom: HTMLInputElement;
}
function currentPlayerInfo() {
    let previewItem = document.querySelector('input[name = "preview_' + player + '"]:checked') as HTMLInputElement;
    let info = new playerInfo;
    if (player == 1) {
        info.shape = shapeArrP1[Number(previewItem.value)];
        info.color = WGo.B;
    } else {
        info.shape = shapeArrP2[Number(previewItem.value)];
        info.color = WGo.W;
    }
    info.dom = previewItem;
    return info;
}

function onClick(x: number, y: number) {
    let info = currentPlayerInfo();
    prevState = board.getState();
    info.shape.paint(board, x, y, { c: info.color });

    back.send(JSON.stringify({
        cmd: "transfer",
        x: x,
        y: y,
        stone: Number(info.dom.value),
        rotate: info.shape.dir
    }));
    record.append({
        player: player,
        x: x,
        y: y,
        stone: Number(info.dom.value),
        rotate: info.shape.dir
    });
    filp_player();
}

function onWheel(x: number, y: number, event: WheelEvent) {
    let previewItem = document.querySelector('input[name = "preview_' + player + '"]:checked') as HTMLInputElement;
    let info = currentPlayerInfo();
    if (event.deltaY > 0) {
        info.shape.rotate();
    } else {
        info.shape.rotateCounter();
    }
    onMousemove(x, y, event);
}

function onMousemove(x: number, y: number, event: MouseEvent) {
    for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 13; j++) {
            board.removeObject({
                x: i,
                y: j,
                type: plane
            })
        }
    }
    let info = currentPlayerInfo();
    info.shape.paint(board, x, y, { type: plane });
}

function onRender(place: CustomEvent) {
    let stone = place.detail as render_info;
    console.log("stone", stone);
    for (let i = 0; i < stone.rotate; i++)
        shapeArrP2[stone.stoneid].rotate();

    let shape: typeof shapeArrP1[0];
    let color: typeof WGo.B;
    if (player == 1) {
        shape = shapeArrP1[stone.stoneid];
        color = WGo.B;
    } else {
        shape = shapeArrP2[stone.stoneid];
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
    filp_player();
}

function onRevert(place: CustomEvent) {
    console.log(prevState);

    // remove plane in prev state
    for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 13; j++) {
            for (let k = 0; k < prevState.objects[i][j].length; k++) {
                // if c (white, black) not found => plane,
                // than reset the plane
                if (prevState.objects[i][j][k].c == undefined) {
                    prevState.objects[i][j].splice(k, 1);
                }
            }
        }
    }
    record.pop();
    filp_player();
    board.restoreState(prevState);
}

function main() {
    board = new WGo.Board(document.getElementById("board"), {
        width: 600,
        size: 13
    });
    record = new game_records;
    back = new backend("wss://play.hare1039.nctu.me");

    board.addEventListener("mousemove", onMousemove);
    board.addEventListener("click", onClick);
    board.addEventListener("wheel", _.debounce(onWheel, 400));
    document.getElementById("board").addEventListener("render", onRender);
    document.getElementById("board").addEventListener("revert", onRevert);
    let option: any = JSON.parse(localStorage.getItem("player"));
    if (option.left != "human" || option.right == "human") {
        player = 2;
    } else {
        player = 1;
    }

    let button = document.getElementById("saveButton");
    button.onclick = function() {
        record.save();
    };
}

main();
