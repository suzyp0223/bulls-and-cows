// Abstract Class 추상클래스

abstract class Animal {
  // 선언된 메서드
  abstract hello(): string

  // 구현된 메서드
  run() {
    return this.hello() + "run";
  }
}

//  직접 인스턴스가 될 수 없다.
// const animal = new Animal();

class Party extends Animal {
  hello()  {
    return 'Party';
  }
}

class Dog extends Animal {
  hello()  {
    return 'Dog';
  }
}



// 하지만 파생된 클래스가 인스턴스가 될수 있다.
const party = new Party();
const dog = new Dog();
console.log(party.hello());
console.log(dog.hello());