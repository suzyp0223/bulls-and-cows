/*
조건부 타입 다루기 - 삼항연산자
SomeType extends OtherType ? TrueType : FalseType;
 */
interface Person {
  name: string;
}
interface Me extends Person {
  age: number;
}
type Ex1 = Me extends Person ? string : number;

class Galaxy {
  type = "AOS";
}
class IPhone {
  type = "IOS";
}
type MyDevice<T> = T extends "IPhone" ? IPhone : Galaxy;
let myPhone: MyDevice<"Galaxy">;
let myPhone2: MyDevice<"IPhone">;
let myPhone3: MyDevice<"Xiaomi">;

type IsNumberType = 123 extends number ? true : false;
type IsNumberType2 = number extends 123 ? true : false;

const isNumberType: IsNumberType = true;
const isNumberType2: IsNumberType2 = false;
