declare var WGo: any;
declare var _: any;


import { plane } from "./stones";
import { shapeArrP1, shapeArrP2 } from "./shapes";
import { backend, render_info } from "./websocket";

let tool = document.getElementById("tool") as HTMLInputElement;
let board: any;
let back: any;
function onClick(x: number, y: number) {
    let previewItem = document.querySelector('input[name = "preview"]:checked') as HTMLInputElement;
    if (tool.value == "black") {
        shapeArrP1[Number(previewItem.value)].paint(board, x, y, { c: WGo.B });
        back.send(JSON.stringify({
            cmd: "transfer",
            x: x,
            y: y,
            stone: Number(previewItem.value),
            rotate: shapeArrP1[Number(previewItem.value)].dir
        }));
    } else if (tool.value == "white") {
        shapeArrP1[Number(previewItem.value)].paint(board, x, y, { c: WGo.W });
    } else if (tool.value == "remove") {
        board.removeObjectsAt(x, y);
    } else {
        shapeArrP1[Number(previewItem.value)].rotate();
    }
}

function onWheel(x: number, y: number, event: WheelEvent) {
    let previewItem = document.querySelector('input[name = "preview"]:checked') as HTMLInputElement;
    if (event.deltaY > 0) {
        shapeArrP1[Number(previewItem.value)].rotate();
    } else {
        shapeArrP1[Number(previewItem.value)].rotateCounter();
    }
    onMousemove(x, y, event);
}

function onMousemove(x: number, y: number, event: MouseEvent) {
    let previewItem = document.querySelector('input[name = "preview"]:checked') as HTMLInputElement;
    for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 13; j++) {
            board.removeObject({
                x: i,
                y: j,
                type: plane
            })
        }
    }
    shapeArrP1[Number(previewItem.value)].paint(board, x, y, { type: plane });
}

function onRender(place: CustomEvent) {
    let stone = place.detail as render_info;
    console.log("stone", stone);
    for (let i = 0; i < stone.rotate; i++)
        shapeArrP2[stone.stoneid].rotate();
    shapeArrP2[stone.stoneid].paint(board, stone.x, stone.y, { c: WGo.W });
}

function main() {
    board = new WGo.Board(document.getElementById("board"), {
        width: 600,
        size: 13
    });
    back = new backend("wss://play.hare1039.nctu.me");
    board.addEventListener("mousemove", onMousemove);
    board.addEventListener("click", onClick);
    board.addEventListener("wheel", _.debounce(onWheel, 400));
    document.getElementById("board").addEventListener("render", onRender);
}


main();
