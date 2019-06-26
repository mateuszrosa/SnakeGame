const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 300;

let dx = 10;
let dy = 0;

let foodX;
let foodY;

const start = document.querySelector('div.buttons > button:nth-child(1)');

let changingDirection = false;

let score = 0;

let snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 },
];

const drawSnakePart = snakePart => {
    ctx.fillStyle = 'lightgreen';
    ctx.strokestyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

const drawSnake = () => {
    snake.forEach(drawSnakePart);
}

const advanceSnake = () => {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if (didEatFood) {
        createFood();
        score += 10;
        document.querySelector('.score').style.display = "block";
        document.querySelector('.score').textContent = `${score}`;
    } else {
        snake.pop();
    }
}

const clearCanvas = () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const main = () => {
    if (endGame()) {
        console.log('end');
        document.querySelector('.score').style.display = 'block';
        document.querySelector('.score').innerHTML = `You lost! Your result is <span>${score}</span> points.`;
        start.textContent = "Play Again";
        resetGame();
        return;
    }
    setTimeout(() => {
        changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        if (endGame()) return;
        main();
    }, 100)
};


const changeDirection = event => {
    const left_key = 37;
    const right_key = 39;
    const up_key = 38;
    const down_key = 40;

    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === left_key && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === up_key && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === right_key && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === down_key && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

const randomTen = (min, max) => {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;

}

const createFood = () => {
    foodX = randomTen(0, canvas.width - 10);
    foodY = randomTen(0, canvas.height - 10);
    snake.forEach(
        function isFoodOnSnake(part) {
            const foodIsOnSnake = part.x == foodX && part.y == foodY;
            if (foodIsOnSnake) {
                createFood();
            }
        }
    )
}


const drawFood = () => {
    ctx.fillStyle = 'red';
    ctx.strokestyle = 'darkred';
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

const endGame = () => {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > canvas.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > canvas.height - 10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;

}

const resetGame = () => {
    score = 0;
    snake = [
        { x: 150, y: 150 },
        { x: 140, y: 150 },
        { x: 130, y: 150 },
        { x: 120, y: 150 },
        { x: 110, y: 150 },
    ];
}

document.addEventListener('keydown', changeDirection);

main();
createFood();