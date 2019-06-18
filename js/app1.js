class Snake {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        console.log(this.canvas);
    }
}

const snake = new Snake();
