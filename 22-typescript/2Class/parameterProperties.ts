// Parameter Properties  - Ts에만 존재 생략해서 쓰는것
// 접근제어자

class Person3 {
  // public name: string;
  // private age: number;
  // protected gender: "M" | "F";

  constructor(
    public name: string,
    private age: number,
    protected gender: "M" | "F"
  ) {
    // this.name = name;
    // this.age = age;
    // this.gender = gender;
  }

  sayName() {
    return `이름은 ${this.name} 입니당`;
  }

  protected sayAge() {
    return `나이는 ${this.age}`;
  }

  private sayGender() {
    return `성별 타입은 ${this.gender}`;
  }
}

class You extends Person3 {
  constructor(name: string, age: number, gender: "M" | "F") {
    super(name, age, gender);
  }
}
