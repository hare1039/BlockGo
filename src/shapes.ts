
enum dir { UP, LEFT, DOWN, RIGHT };
interface basicShape {
    data: number[][];
    dir: number;
}

class type1 implements basicShape {
    data = [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    dir = 0;
}
class type2 extends type1 { }

class type3 implements basicShape {
    data = [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    dir = 0;
}

class type4 implements basicShape {
    data = [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    dir = 0;
}
class type5 implements basicShape {
    data = [
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    dir = 0;
}
class type6 implements basicShape {
    data = [
        [1, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    dir = 0;
}
class type7 implements basicShape {
    data = [
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    dir = 0;
}
class type8 implements basicShape {
    data = [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    dir = 0;
}
class type9 implements basicShape {
    data = [
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    dir = 0;
}

var shapeArr: basicShape[] = [
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


export { dir, basicShape, shapeArr };
