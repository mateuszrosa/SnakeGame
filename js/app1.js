class Snake {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.dx = 10;
        this.dy = 0;
        this.foodX;
        this.foodY;
        this.changingDirection = false;
        this.score = 0;

        this.snake = [
            { x: 150, y: 150 },
            { x: 140, y: 150 },
            { x: 130, y: 150 },
            { x: 120, y: 150 },
            { x: 110, y: 150 },
        ];
    }
}

const snake = new Snake();
