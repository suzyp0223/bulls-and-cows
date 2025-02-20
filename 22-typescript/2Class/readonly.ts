// readonly - ts 제공

class Test {
  name: string;
  // age: number;
  readonly age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  //readonly 시 에러
  setAge(newAge: number) {
    this.age = age;
  }
}
p.age = 100; //readonly 시 에러

const p = new Test("kim", 20);

const p2 = {
  name: "kim2",
};

p.name = "K";
console.log(p); //K

console.log(p2); //kim2
p2.name = "LL";
console.log(p2); //LL
