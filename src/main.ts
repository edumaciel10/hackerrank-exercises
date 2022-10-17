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
function getAllIndexes(arr: number[], val: number) : number[] {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}
const getIndexesFromValue = (h: number[], value:number) => {
        const indexes = getAllIndexes(h, value);
        return {
            value,
            indexes,
        }
}
const rightArea = (arr: number[], actualValue:number,actualIndex:number) => {
    if(arr.length == 0) {
        return 0;
    }
    const lowerValueIndex = arr.findIndex((value) => value<actualValue)
    const area = actualValue * ((lowerValueIndex == -1 ? arr.length:lowerValueIndex+1));

    return area;
}

function largestRectangle(h: number[]): number{
    let greatestArea = h[0];

    const smallestValuesSort = h.slice().sort((a: number, b: number) => a - b);
    for(let i =0; i < smallestValuesSort.length; i++) {
        const {value, indexes} = getIndexesFromValue(h, smallestValuesSort[i]);
        const nonSequentialIndexes = indexes.filter((index, i) => index !== indexes[i-1]+1);
        if(i ==0 ) {
            greatestArea = value * h.length;
            continue;
        }

        const actualArea = nonSequentialIndexes.reduce((acc, actualIndex) => {
            const valueRightArea = rightArea(h.slice(actualIndex+1, h.length), value, actualIndex)
            const valueLeftArea = actualIndex-1 >= 0 ? rightArea(h.slice(0, actualIndex-1).reverse(), value, actualIndex) : 0;
            return acc += (valueRightArea + valueLeftArea);
        }, 0)

        if(actualArea > greatestArea) {
            greatestArea = actualArea;
        }
    }
    return greatestArea;
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
