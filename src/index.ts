import p5 from 'p5';

new p5(sketch);

function sketch(p: p5) {
    p.setup = () => {
        p.createCanvas(400, 400);
    };

    p.draw = () => {
        p.background(0);
    };
}
