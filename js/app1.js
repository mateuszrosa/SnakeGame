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

        this.drawSnake();
    }
    drawSnakePart = snakePart => {
        this.ctx.fillStyle = 'lightgreen';
        this.ctx.strokestyle = 'darkgreen';
        this.ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        this.ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }
    drawSnake = () => {
        this.snake.forEach(this.drawSnakePart);
    }
}

const snake = new Snake();
