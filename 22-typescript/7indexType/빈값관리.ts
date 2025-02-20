/**
 * Non-null Assertion Operator (Postfix !)
 * and
 * Optional chaining
 */
let nil = null;
let un;

function func(): void {}

function func2(): undefined {
  return undefined;
}

function func3(): null {
  return null;
}

console.log(func());
console.log(func2());
console.log(func3());

// ---cut---

interface Home {
  foods?: string[];
  books?: string[];
}

const MyHome: Home = {};

// 값이 있음을 TS에 개발자가 알린다
MyHome.foods!.push("banana");

MyHome.books?.push("Clean Code");
