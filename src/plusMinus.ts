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
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr: number[]): number[] {
    const arrLength = arr.length;

    const postiveNumbersLength = arr.filter((val) =>val >0).length

    const negativeNumberslength = arr.filter((val) => val<0).length

    const zeroNumbersLength = arr.filter((val) => val == 0).length

    return [
        postiveNumbersLength/arrLength,
        negativeNumberslength/arrLength,
        zeroNumbersLength/arrLength,
    ]

}

function main() {
    // const ws: WriteStream = createWriteStream(process.env["OUTPUT_PATH"]);
    // const ws: WriteStream = createWriteStream("ouput.txt");

    const n: number = parseInt(readLine().trim(), 10);

    const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = plusMinus(arr);

    result.map((val) => {
        ws.write(val + '\n');
    })
    ws.end();
}
