declare var WGo: any;

var plane = {
    stone: {
        // draw function is called in context of CanvasRenderingContext2D, so we can paint immediately using this
        draw: function(args: any, board: any) {
            var xr = board.getX(args.x), // get absolute x coordinate of intersection
                yr = board.getY(args.y), // get absolute y coordinate of intersection
                sr = board.stoneRadius; // get field radius in px

            // if there is a black stone, draw white plane
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
}


export { plane };
