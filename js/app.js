const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const table = () => {
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(0, 0, cw, ch);
};

table();