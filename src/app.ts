declare var WGo: any;

import { plane } from "./stones";

let board: any = new WGo.Board(document.getElementById("board"), {
    width: 600,
    size: 13
});

let tool = document.getElementById("tool") as HTMLInputElement;
board.addEventListener("click", function(x: number, y: number) {
    if (tool.value == "black") {
        board.addObject({
            x: x,
            y: y,
            c: WGo.B
        });
    } else if (tool.value == "white") {
        board.addObject({
            x: x,
            y: y,
            c: WGo.W
        });
    } else if (tool.value == "remove") {
        board.removeObjectsAt(x, y);
    } else if (tool.value == "plane") {
        board.addObject({
            x: x,
            y: y,
            type: plane
        });
    } else {
        board.addObject({
            x: x,
            y: y,
            type: tool.value
        });
    }
    console.log(tool)
});


var currentMouse = {};
board.addEventListener("mousemove", function(x: number, y: number, event: MouseEvent) {
    board.addObject({
        x: x,
        y: y,
        type: plane
    });
    currentMouse = { x, y };
});

