/*
interface 인터페이스
정의, 설계

implements
구현
 */

interface Person {
  name: string;
  // age: number;
  run(): string;
}

// const park: Person = {
//   name: 'park',
//   age:10,
// }

interface People1 extends Person{
  sayName(): string;
}

const guu: People1 = {
  name: 'guu',
  run() {
    return 'string';
  },
  sayName() {
    return 'string2';
  }
}
