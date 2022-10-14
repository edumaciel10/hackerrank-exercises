'use strict';

import { WriteStream, createWriteStream } from "fs";
import BigNumber from 'bignumber.js';
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

function extraLongFactorials(n) {
    const result = [...Array(n).keys()];
    const factorial = (result.reduce((acc, val) => {
        return new BigNumber(acc).multipliedBy(val+1)
    },new BigNumber(1))) 
    console.log(factorial.toFixed(0))


}

function main() {
    const ws: WriteStream = createWriteStream("output.txt");
    
    const n: number = parseInt(readLine().trim(), 10);
    extraLongFactorials(n);
    
    ws.end();
}