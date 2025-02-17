/*
super
기본 클래스 호출시 사용
 생성자에서 this 사용 전 호출되어야함
 */

//  기본클래스
 class Animal {
  name: string

  constructor(name: string) {
    this.name= name
  }

   sayName() {
    return `동물의 이름은${this.name}`
  }
}

// 기본클래스에서 확장시킨 파생된 클래스
class Person extends Animal {
  constructor(name: string) {
    super(name)
  }

  sayName() {
    // super로 접근하면 this와 다르게 상위 클래스를 참조
    // 파생된 클래스의 this는 생성된 인스턴스(new Person의 person)를 바라봄.
    return `${super.sayName()}, 사람의 이름은 ${this.name}`
  }
}
const person1 = new Person("Jang");
console.log(person1.sayName());  // 동물의 이름은 Jang, 사람의 이름은 Jang

class Jang extends Person {
  constructor(name: string) {
    super(name);
  }

  sayName() {
    return `${super.sayName()}, 그리고 성은 장입니다.`;
  }
}


const person = new Jang("Jang");
console.log(person.sayName()); // 동물의 이름은 Jang, 사람의 이름은 Jang, 그리고 성은 장입니다.