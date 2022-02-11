import p5 from 'p5';

new p5(sketch);

const canvasSize = 500;

function sketch(p: p5) {
    p.setup = () => {
        p.createCanvas(canvasSize, canvasSize);
        drawLines(p);
        // createOlds(p);
    };

    p.draw = () => {};
}

// Old === squares
function createOlds(p: p5) {
    const linesOffset = canvasSize / 3;

    for (let y = 0; y <= canvasSize; y += linesOffset) {
        for (let x = 0; x <= canvasSize; x += linesOffset) {
            p.stroke(0);
            p.fill(255);
            p.square(x, y, linesOffset);
        }
    }
}

function drawLines(p: p5) {
    p.stroke(0);
    p.strokeWeight(3);

    const linesOffset = canvasSize / 3;

    for (let i = 1; i <= 2; i++) {
        const x = linesOffset * i;
        p.line(x, 0, x, canvasSize);
    }

    for (let i = 1; i <= 2; i++) {
        const y = linesOffset * i;
        p.line(0, y, canvasSize, y);
    }
}
