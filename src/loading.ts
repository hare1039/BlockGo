let thinkingImgList = [
    "./asset/loading/normal.gif",
    "./asset/loading/long.gif",
    "./asset/loading/sabaki.gif",
    "./asset/loading/wakaru.gif"
];

function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomLoadingImg() {
    return thinkingImgList[getRndInteger(0, thinkingImgList.length)];
}

export { randomLoadingImg };
