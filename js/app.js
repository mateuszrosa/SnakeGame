const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 300;

let dx = 10;
let dy = 0;

let foodX;
let foodY;

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
    if (snake[0].x + 10 === canvas.width) {
        // console.log(snake[0].x);
        // snake[0].x = 0;
        return;
    } else if (snake[0].x - 10 < 0) {
        // snake[0].x = 300;
        return;
    } else if (snake[0].y - 10 < 0) {
        // snake[0].y = 300;
        return;
    } else if (snake[0].y + 10 == canvas.height) {
        // snake[0].y = 0;
        return;
    }
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if (didEatFood) {
        createFood();
        score += 10;
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
    setTimeout(() => {
        changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
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
}

snake.forEach(
    function isFoodOnSnake(part) {
        const foodIsOnSnake = part.x == foodX && part.y == foodY;
        if (foodIsOnSnake) {
            createFood();
        }
    }
)


const drawFood = () => {
    ctx.fillStyle = 'red';
    ctx.strokestyle = 'darkred';
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

document.addEventListener('keydown', changeDirection);

main();
createFood();