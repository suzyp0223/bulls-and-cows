/*
import { createContext } from 'react';
Access Modifiers 접근제어자
*/

class People {
  public name: string;
  private age: number;
  protected gender: "M" | "F";

  constructor(name: string, age: number, gender: "M" | "F") {
    this.name = name;
    this.age = age;
    this.gender = gender;
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

class Me extends People {
  constructor(name: string, age: number, gender: "M" | "F") {
    super(name, age, gender);
  }

  sayInfo() {
    return `${super.sayName()} ${super.sayAge()} ${super.gender}`;
  }
}

const p = new People("park", 100, "F");
