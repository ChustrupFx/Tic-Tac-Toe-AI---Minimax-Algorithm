import p5 from 'p5';

new p5(sketch);

const canvasSize = 500;
const linesOffset = canvasSize / 3;
const squareSize: number = linesOffset;
const generalStrokeWeight = 3;
const board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];
var currentFigure = 'X';

function sketch(p: p5) {
    p.setup = () => {
        p.createCanvas(canvasSize, canvasSize);
    };

    p.draw = () => {
        createOlds(p);
        drawBoardFigures(p);
        drawLines(p);
    };

    p.mousePressed = () => {
        for (const rowIndex in board) {
            const row = board[rowIndex];
            for (const columnIndex in row) {
                const figureInCurrentSquare = row[columnIndex];

                if (figureInCurrentSquare != '') continue;

                const squareX: number = parseFloat(columnIndex) * squareSize;
                const squareY: number = parseFloat(rowIndex) * squareSize;

                if (p.mouseX < 0 || p.mouseX > canvasSize) continue;
                if (p.mouseY < 0 || p.mouseY > canvasSize) continue;

                if (
                    p.mouseX >= squareX &&
                    p.mouseX < squareX + squareSize &&
                    p.mouseY > squareY &&
                    p.mouseY <= squareY + squareSize
                ) {
                    row[columnIndex] = currentFigure;

                    currentFigure = currentFigure === 'X' ? 'O' : 'X';
                }
            }
        }
    };
}

function checkForWinner(): boolean {
    return (
        checkForDiagonalWin() ||
        checkForHorizontalWin() ||
        checkForVerticalWin()
    );

    function checkForDiagonalWin(): boolean {
        const firstDiagonalConcatenated =
            board[0][0] + board[1][1] + board[2][2];

        const secondDiagonalConcatenated =
            board[0][2] + board[1][1] + board[2][0];

        if (
            firstDiagonalConcatenated === 'XXX' ||
            firstDiagonalConcatenated === 'OOO'
        )
            return true;

        if (
            secondDiagonalConcatenated === 'XXX' ||
            secondDiagonalConcatenated === 'OOO'
        )
            return true;

        return false;
    }

    function checkForVerticalWin(): boolean {
        for (let i = 0; i < 3; i++) {
            const concatenated = board[0][i] + board[1][i] + board[2][i];

            if (concatenated === 'XXX' || concatenated === 'OOO') return true;
        }

        return false;
    }
}

function checkForHorizontalWin(): boolean {
    for (const row of board) {
        const concatenated = row.reduce(
            (accumulator, figure) => (accumulator += figure),
            ''
        );

        if (concatenated === 'XXX' || concatenated === 'OOO') return true;
    }

    return false;
}

// Old === squares
function createOlds(p: p5): void {
    for (let y = 0; y <= canvasSize; y += linesOffset) {
        for (let x = 0; x <= canvasSize; x += linesOffset) {
            p.noStroke();
            p.fill(255);
            p.square(x, y, linesOffset);
        }
    }
}

function drawBoardFigures(p: p5): void {
    const padding: number = 70;

    for (const rowIndex in board) {
        const column: string[] = board[rowIndex];

        for (const columnIndex in column) {
            const figureToBeDrawn: string = column[columnIndex].toLowerCase();

            if (figureToBeDrawn === 'x')
                drawX([parseFloat(rowIndex), parseFloat(columnIndex)]);
            if (figureToBeDrawn === 'o')
                drawO([parseFloat(rowIndex), parseFloat(columnIndex)]);
        }
    }

    function drawO([rowIndex, columnIndex]: number[]): void {
        const circleX = columnIndex * squareSize + squareSize / 2;
        const circleY = rowIndex * squareSize + squareSize / 2;
        const circleRadius = squareSize - padding;
        p.stroke(0);
        p.strokeWeight(generalStrokeWeight);
        p.circle(circleX, circleY, circleRadius);
    }

    function drawX([rowIndex, columnIndex]: number[]): void {
        p.stroke(0);
        p.strokeWeight(generalStrokeWeight);
        const firstLineX1 = columnIndex * squareSize + padding / 2;
        const firstLineY1 = rowIndex * squareSize + padding / 2;
        const firstLineX2 = (columnIndex + 1) * squareSize - padding / 2;
        const firstLineY2 = (rowIndex + 1) * squareSize - padding / 2;
        p.line(firstLineX1, firstLineY1, firstLineX2, firstLineY2);

        const secondLineX1 = (columnIndex + 1) * squareSize - padding / 2;
        const secondLineY1 = rowIndex * squareSize + padding / 2;
        const secondLineX2 = columnIndex * squareSize + padding / 2;
        const secondLineY2 = (rowIndex + 1) * squareSize - padding / 2;
        p.line(secondLineX1, secondLineY1, secondLineX2, secondLineY2);
    }
}

function drawLines(p: p5): void {
    p.stroke(0);
    p.strokeWeight(generalStrokeWeight);

    for (let i = 1; i <= 2; i++) {
        const x = linesOffset * i;
        p.line(x, 0, x, canvasSize);
    }

    for (let i = 1; i <= 2; i++) {
        const y = linesOffset * i;
        p.line(0, y, canvasSize, y);
    }
}
