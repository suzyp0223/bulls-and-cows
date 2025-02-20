/*
Getter & Setter
필으데 접근할 권한을 가진 제어자

getter o / setter X => 속성은 자동으로 읽기 전용
setter 매개변수의 타입 X / getter의 반환 타입에서 추론

private 속성은 .연산자로 접근할 수 없음.
 */

class Human {
  name: string;
  private _age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this._age = age;
  }

  // private으로 숨긴 age를 볼수 있음
  get age() {
    if (this._age === 0) {
      return "설정되지 않았습니다.";
    }
    return `나이?  ${this._age} 세임!! `;
  }
  set age(age) {
    if (typeof age === "number") {
      this._age = age;
    }
    this._age = 0;
  }
}

const hu1 = new Human("park", 30);
console.log("hu1: ", hu1.name);
// console.log('hu1: ', hu1._age);
