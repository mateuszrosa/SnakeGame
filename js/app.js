const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 800;

const cw = canvas.width;
const ch = canvas.height;

const snakeWidth = 75;
const snakeHeight = 20;

let snakeWidthStart = 500;
let snakeHeightStart = 200;

const table = () => {
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(0, 0, cw, ch);
};

const snake = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(snakeWidthStart, snakeHeightStart, snakeWidth, snakeHeight);
}

const snakeMove = () => {
    snakeWidthStart += 20;
    console.log(snakeWidthStart, snakeWidth);
}

window.addEventListener('keydown', e => {
    console.log(e.keyCode);
    if (e.keyCode === 39) {
        ctx.fillRect(snakeHeightStart, snakeWidthStart, snakeHeight, snakeWidth);
    }
})

table();
snake();

// setInterval(() => {
//     if ((snakeWidthStart + snakeWidth) >= cw) return;
//     table();
//     snakeMove();
//     snake();
// }, 200);