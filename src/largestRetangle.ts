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
    // avoid create an matrix, it's consume too much memory when used with reduce an map
    let retangles = []
    h.reduce((acc, val, index) => {
      console.log({acc});
      return acc;
    },1)

    return 0;

}

function main() {
    const ws: WriteStream = createWriteStream("output.txt");
    // const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);
  console.log({n});
    const h: number[] = readLine().replace(/\s+$/g, '').split(' ').map(hTemp => parseInt(hTemp, 10));

    const result: number = largestRectangle(h);

    ws.write(result + '\n');

    ws.end();
}
