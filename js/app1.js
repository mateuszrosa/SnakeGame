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

        document.addEventListener('keydown', this.changeDirection);

        this.drawSnake();
        this.main();
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
    advanceSnake = () => {
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
        this.snake.unshift(head);
        const didEatFood = this.snake[0].x === this.foodX && this.snake[0].y === this.foodY;
        if (didEatFood) {
            // createFood();
            score += 10;
            document.querySelector('.score').style.display = "block";
            document.querySelector('.score').textContent = `${score}`;
        } else {
            this.snake.pop();
        }
    }
    clearCanvas = () => {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    main = () => {
        setTimeout(() => {
            this.clearCanvas();
            this.advanceSnake();
            this.drawSnake();
            this.main();
        }, 100)
    }
    changeDirection = event => {
        const left_key = 37;
        const right_key = 39;
        const up_key = 38;
        const down_key = 40;

        // if (this.changingDirection) return;
        // this.changingDirection = true;

        const keyPressed = event.keyCode;
        const goingUp = this.dy === -10;
        const goingDown = this.dy === 10;
        const goingRight = this.dx === 10;
        const goingLeft = this.dx === -10;
        if (keyPressed === left_key && !goingRight) {
            this.dx = -10;
            this.dy = 0;
        }
        if (keyPressed === up_key && !goingDown) {
            this.dx = 0;
            this.dy = -10;
        }
        if (keyPressed === right_key && !goingLeft) {
            this.dx = 10;
            this.dy = 0;
        }
        if (keyPressed === down_key && !goingUp) {
            this.dx = 0;
            this.dy = 10;
        }
    }
    randomTen = (min, max) => {
        return Math.round((Math.random() * (max - min) + min) / 10) * 10;

    }
    createFood = () => {
        this.foodX = this.randomTen(0, this.canvas.width - 10);
        this.foodY = this.randomTen(0, this.canvas.height - 10);
    }
    drawFood = () => {
        this.ctx.fillStyle = 'red';
        this.ctx.strokestyle = 'darkred';
        this.ctx.fillRect(this.foodX, this.foodY, 10, 10);
        this.ctx.strokeRect(this.foodX, this.foodY, 10, 10);
    }
}

const snake = new Snake();
