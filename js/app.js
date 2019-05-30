const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 300;

let dx = 10;
let dy = 0;

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
    if (snake[0].x == 300) {
        snake[0].x = 0;
    } else if (snake[0].x == 0) {
        snake[0].x = 300;
    }
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
}

const clearCanvas = () => {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

drawSnake();

const main = () => {
    setTimeout(() => {
        clearCanvas();
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
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === left_key && !goingRight) {
        dx = -10;
        dy = 0;
        console.log(dx, dy);
    }
    if (keyPressed === up_key && !goingDown) {
        dx = 0;
        dy = -10;
        console.log(dx, dy);
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

document.addEventListener('keydown', changeDirection);

main();