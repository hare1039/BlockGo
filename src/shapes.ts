
class basicShape {
    data: number[][];
    dir: number = 0;
    rotate = () => {
        let newArr: number[][] = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        let len = 4;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                newArr[i][j] = this.data[j][len - 1 - i];
            }
        }
        this.data = newArr;
        this.dir++;
    }
    rotateCounter = () => {
        this.rotate();
        this.rotate();
        this.rotate();
    }
    paint = (board: any, x: number, y: number, what: Object) => {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let obj = (<any>Object).assign({
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

class type1 extends basicShape {
    data = [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}
class type2 extends type1 { }

class type3 extends basicShape {
    data = [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

class type4 extends basicShape {
    data = [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}
class type5 extends basicShape {
    data = [
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}
class type6 extends basicShape {
    data = [
        [1, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}
class type7 extends basicShape {
    data = [
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}
class type8 extends basicShape {
    data = [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}
class type9 extends basicShape {
    data = [
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

var shapeArrP1: basicShape[] = [
    new type1, // this is padding
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
var shapeArrP2: basicShape[] = [
    new type1, // this is padding
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


export { basicShape, shapeArrP1, shapeArrP2 };
