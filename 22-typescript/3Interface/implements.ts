/*
implements 구현
*/

interface Summer {
  name: string
  run(): string
}

interface Fall {
  sayName(): string
}


class AnyClass {

}

class Woo extends AnyClass implements Summer, Fall {
  constructor(public name: string) {
    super();
  }

  run() {
    return this.name;
  }

  sayName(): string {
    return `사람의 이름은 ${this.name}`;
  }
}