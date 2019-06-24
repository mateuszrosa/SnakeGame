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
        this.isFoodOnSnake;
        this.changingDirection = false;
        this.score = 0;
        this.game;
        this.start = document.querySelector('div.buttons > button:nth-child(1)');
        this.start.addEventListener('click', e => {
            if (e.target.textContent === "Start" || e.target.textContent === "Play Again") {
                if (e.target.textContent === "Play Again") {
                    document.querySelector('.score').style.display = 'none';
                    document.querySelector('.score').textContent = ``;
                }
                this.main();
                e.target.textContent = "Pause";
            } else if (e.target.textContent === "Pause") {
                clearTimeout(this.game);
                e.target.textContent = "Replay";
            } else if (e.target.textContent === "Replay") {
                this.main();
                e.target.textContent = "Pause";
            }
        })

        this.snake = [
            { x: 150, y: 150 },
            { x: 140, y: 150 },
            { x: 130, y: 150 },
            { x: 120, y: 150 },
            { x: 110, y: 150 },
        ];

        document.addEventListener('keydown', this.changeDirection);

        this.drawSnake();
        this.createFood();
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
            this.createFood();
            this.score += 10;
            document.querySelector('.score').style.display = "block";
            document.querySelector('.score').textContent = `${this.score}`;
        } else {
            this.snake.pop();
        }
    }
    clearCanvas = () => {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    main = () => {
        this.game = setTimeout(() => {
            this.changingDirection = false;
            this.clearCanvas();
            this.advanceSnake();
            this.drawFood();
            this.drawSnake();
            if (this.endGame()) {
                document.querySelector('.score').style.display = 'block';
                document.querySelector('.score').innerHTML = `You lost! Your result is <span>${this.score}</span> points.`;
                this.start.textContent = "Play Again";
                this.resetGame();
                return;
            }
            this.main();
        }, 100)
    }
    changeDirection = event => {
        const left_key = 37;
        const right_key = 39;
        const up_key = 38;
        const down_key = 40;

        if (this.changingDirection) return;
        this.changingDirection = true;

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
        this.snake.forEach(
            this.isFoodOnSnake = part => {
                const foodIsOnSnake = part.x == this.foodX && part.y == this.foodY;
                if (foodIsOnSnake) {
                    this.createFood();
                }
            }
        )
    }
    drawFood = () => {
        this.ctx.fillStyle = 'red';
        this.ctx.strokestyle = 'darkred';
        this.ctx.fillRect(this.foodX, this.foodY, 10, 10);
        this.ctx.strokeRect(this.foodX, this.foodY, 10, 10);
    }
    endGame = () => {
        for (let i = 4; i < this.snake.length; i++) {
            const didCollide = this.snake[i].x === this.snake[0].x && this.snake[i].y === this.snake[0].y;
            if (didCollide) {
                return true;
            }
            const hitLeftWall = this.snake[0].x < 0;
            const hitRightWall = this.snake[0].x > this.canvas.width - 10;
            const hitTopWall = this.snake[0].y < 0;
            const hitBottomWall = this.snake[0].y > this.canvas.height - 10;

            return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
        }
    }
    resetGame = () => {
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
