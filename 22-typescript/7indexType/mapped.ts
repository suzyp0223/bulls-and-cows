/*
Mapped 맵드 타입 다루기

기존 타입을 기반으로 새로운 타입을 정의할 수 있도록 해준다.
액세스 서명이나 조건부 타입과 함께 사용할 수도 있다.
 */

// 예시
const newNum = [1, 2, 3].map((num) => num ** 2);
console.log("newNum: ", newNum); // [1, 4, 9]

type Person1 = {
  name: string;
  age: number;
  gender: string;
};

// 문자열 키(string)와 값이 T인 객체를 정의
// T가 number라면 Dict<number>는 숫자 값들을 가진 객체
type Dict<T> = {
  [key: string]: T;
};

const newPerson: Dict<Person1> = {};
newPerson.me;

// NewRecord 객체가 you와 we라는 키를 가지며,
// 이 키들에 각각 Person1 타입의 객체가 할당된다
type NewRecord = {
  [key in "you" | "we"]: Person1;
};

const record: NewRecord = {
  you: { name: "John", age: 30, gender: "Male" },
  we: { name: "Jane", age: 25, gender: "Female" },
};

function printNewPerson(newPerson: NewRecord) {
  newPerson.we;
  newPerson.you;
  newPerson.me; // NewRecord 타입에 you,we만정의 되어있어 오류남.
}
