
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
                newArr[i][j] = this.data[len - 1 - j][i];
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
        let shift_mapping = (<any>Object).assign({}, this.data);
        const len = 4;
        // shifting up
        for (; ;) {
            let is_empty = true;
            for (let i = 0; i < len; i++) {
                if (shift_mapping[0][i] != 0) {
                    is_empty = false;
                    break;
                }
            }

            if (is_empty == false) {
                break;
            } else {
                // shift up 1 level
                for (let i = 0; i < len; i++) {
                    shift_mapping[0][i] = shift_mapping[1][i];
                    shift_mapping[1][i] = shift_mapping[2][i];
                    shift_mapping[2][i] = shift_mapping[3][i];
                    shift_mapping[3][i] = 0;
                }
            }
        }


        // shifting left
        for (; ;) {
            let is_empty = true;
            for (let i = 0; i < len; i++) {
                if (shift_mapping[i][0] != 0) {
                    is_empty = false;
                    break;
                }
            }

            if (is_empty == false) {
                break;
            } else {
                // shift left 1 level
                for (let i = 0; i < len; i++) {
                    shift_mapping[i][0] = shift_mapping[i][1];
                    shift_mapping[i][1] = shift_mapping[i][2];
                    shift_mapping[i][2] = shift_mapping[i][3];
                    shift_mapping[i][3] = 0;
                }
            }
        }


        // render
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
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
