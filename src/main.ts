'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
    console.log({inputStdin})
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
 * Complete the 'aVeryBigSum' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts LONG_INTEGER_ARRAY ar as parameter.
 */

function aVeryBigSum(ar: number[]): number {
    return ar.reduce((acc, val) => {
        return acc+=val;
    })
}

function main() {
    const ws: WriteStream = createWriteStream("output.txt");
    const arCount: number = parseInt(readLine().trim(), 10);
    const ar: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arTemp => parseInt(arTemp, 10));

    const result: number = aVeryBigSum(ar);
  console.log(result);
    ws.write(result + '\n');

    ws.end();
}