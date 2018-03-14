declare var WGo: any;

import { plane } from "./stones";
import { shapeArr } from "./shapes";


let board: any = new WGo.Board(document.getElementById("board"), {
    width: 600,
    size: 13
});


let tool = document.getElementById("tool") as HTMLInputElement;
board.addEventListener("click", function(x: number, y: number) {
    let previewItem = document.querySelector('input[name = "preview"]:checked') as HTMLInputElement;
    if (tool.value == "black") {
        shapeArr[Number(previewItem.value)].paint(board, x, y, { c: WGo.B });
    } else if (tool.value == "white") {
        shapeArr[Number(previewItem.value)].paint(board, x, y, { c: WGo.W });
    } else if (tool.value == "remove") {
        board.removeObjectsAt(x, y);
    } else {
        board.addObject({
            x: x,
            y: y,
            type: tool.value
        });
    }
});


board.addEventListener("mousemove", function(x: number, y: number, event: MouseEvent) {
    for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 13; j++) {
            board.removeObject({
                x: i,
                y: j,
                type: plane
            })
        }
    }
    let previewItem = document.querySelector('input[name = "preview"]:checked') as HTMLInputElement;
    shapeArr[Number(previewItem.value)].paint(board, x, y, { type: plane });
});

