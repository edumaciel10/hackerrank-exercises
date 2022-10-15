'use strict';
// https://www.hackerrank.com/challenges/largest-rectangle/problem?isFullScreen=true
import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
 * Complete the 'largestRectangle' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts INTEGER_ARRAY h as parameter.
 */

function largestRectangle(h: number[]): number {
    let retanglesSizeCounter = h.length;
    let retangles = Array.from(Array(h.length), () => {
        const k = new Array(retanglesSizeCounter);
        retanglesSizeCounter--;
        return k;
    })
    for(let i = 0; i < h.length; i++) {
        for(let j = i; j< h.length; j++ ) {
            retangles[i][j] = h.slice(i,j).reduce((acc, val, index) => {
                if(index >= j) {
                    return acc;
                }
                if(acc > val) {
                    return val;
                }
                if(val < acc ) {
                    return val;
                }
                return acc
            },h[i]) 
            // console.log({retangles});
        }
    }
    const retanglesSize = retangles.map((val) => val.filter(elm => elm))
    const largestRectangle = retanglesSize.reduce((acc, val) => {
        const lowestValue = Math.min(...val);
        acc.push(lowestValue * val.length)
        return acc;
    },[])

    return Math.max(...largestRectangle);
}

function main() {
    const ws: WriteStream = createWriteStream("output.txt");
    // const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const h: number[] = readLine().replace(/\s+$/g, '').split(' ').map(hTemp => parseInt(hTemp, 10));

    const result: number = largestRectangle(h);

    ws.write(result + '\n');

    ws.end();
}
