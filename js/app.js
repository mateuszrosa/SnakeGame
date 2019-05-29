const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 300;

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
    }
    clearCanvas();
    dx = 10;
    dy = 0;
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

main();