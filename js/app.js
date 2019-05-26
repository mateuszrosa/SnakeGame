const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 800;

const cw = canvas.width;
const ch = canvas.height;

const snakeWidth = 75;
const snakeHeight = 20;

const table = () => {
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(0, 0, cw, ch);
};

const snake = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(500, 200, snakeWidth, snakeHeight);
}

table();
snake();