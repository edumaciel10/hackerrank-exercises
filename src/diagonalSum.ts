'use strict';

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
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

function diagonalDifference(arr: number[][]): number {
    const columnSize = arr[0].length;
    const leftToRightIndexes : number[] = new Array(columnSize)
    const rightToLeftIndexes : number[]= new Array(columnSize).map((val, index)=> {
        return columnSize-1-index
    })
    
    const diagonalDifference = new Array(columnSize).map((val, index)=> {
        const leftToRightValue = arr[index][leftToRightIndexes[index]]
        const rightToLeftValue = arr[index][rightToLeftIndexes[index]]
        return Math.abs(leftToRightValue - rightToLeftValue);
    })
    
    return diagonalDifference.reduce((val, acc) => {
        return acc +=val;
    },0)

}

function main() {
    const ws: WriteStream = createWriteStream("output.txt");

    const n: number = parseInt(readLine().trim(), 10);

    let arr: number[][] = Array(n);

    for (let i: number = 0; i < n; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    const result: number = diagonalDifference(arr);

    ws.write(result + '\n');

    ws.end();
}
