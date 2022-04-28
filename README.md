# math-vectors
Typescript npm package for dealing with math vectors. Including but not limited to 2D, 3D, ND, Complex.

## Install

`npm i math-vectors`

## Usage

_Code Example_
```TypeScript
//import a class to start
import {Vector} from 'math-vectors';

//you can create a Vector passing the single entries...
let a = new Vector(1,0,1,2,1);

//or an Array of numbers!
let b = [5,9,3,0,-1];
let c = new Vector(b);

//expected result: "Vector { components: [ 6, 9, 4, 2, 0 ] }"
console.log(a.add(c));
```

## Docs

You can find all the docs [here](https://safesintesi.github.io/math-vectors/index.html)