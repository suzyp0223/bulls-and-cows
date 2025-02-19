/*
import { interfaceExtends } from './../jsdoc/node_modules/@babel/types/lib/index-legacy.d';
import { extends } from './../vite-ts/node_modules/acorn/dist/acorn';
제네릭 <>
*/
// function getInfo(msg: string | number | number[] | string[]) {
// function getInfo(msg: any): any {  // any를 쓰면 타입스크립트가 아니다
// function getInfoUnion(msg: string | number | number[] | string[]) {

// 제네릭
// function getInfo<타입 변수 지정>(msg: 타입 인자): 타입 반환 {
function getInfo<T>(msg: T): T {
  return msg;
}

console.log(getInfo("Word"));
console.log(getInfo(123));
console.log(getInfo([1, 2]));
console.log(getInfo(["C", "T"]));

// -----------제네릭 사용 후------
console.log(getInfo<string>("Word"));
console.log(getInfo<number>(123));
console.log(getInfo<number[]>([1, 2]));
console.log(getInfo<string[]>(["C", "T"]));

/*
함수에서의 제네릭
*/
type TypeGetInfoFunc = <T>(msg: T) => T;
interface interfaceGetInfoFunc {
  <T>(msg: T): T;
}

// function getInfo<타입 변수 지정>(msg: 타입 인자): 타입 반환 {
function getInfoFunc<T>(msg: T): T {
  return msg;
}

const TypeAliases: TypeGetInfoFunc = getInfoFunc;
const typeInterface: interfaceGetInfoFunc = getInfoFunc;

function getInfoMultiple<T1, T2>(msg: [T1, T2]): [T1, T2] {
  return msg;
}

getInfoMultiple<String, number>(["str", 123]);

/*
클래스에서의 제네릭
U = union
*/
class Animal<T, U> {
  name: T;
  genderType: U;
  constructor(name: T, genderType: U) {
    this.name = name;
    this.genderType = genderType;
  }
}

type GenderType = "M" | "F";
const dog = new Animal<string, GenderType>("강아지", "M");
const cat = new Animal<GenderType, string>("F", "고양이");


/*
제네릭 타입 좁히기 (extends)
extends 키워드로 타입을 좁힐 수 있다.
*/
function printMessage<T extends string | number> (msg: T) {
  return msg;
}
printMessage('Hello');
printMessage(123);
//error!
// printMessage<string[]>(["H","E","L","L","O"]);


function printArr<T extends string[] | number[]> (msg: T) {
return msg.toString();
}
printArr(["H","E","L","L","O"]);
printArr([1, 2, 3]);
//error!
// printArr<boolean[]>([true, false]);
