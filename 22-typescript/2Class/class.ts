/*
  Class
 */

class Person {
  /*
  필드
  일종의 속성 (속성-고유의 인스턴스)
  public으로 사용가능
  */

  name: string;
  age: number;
  readonly location: string = "Korea";

  /*
  생성자
  -초기화를 담당
  */
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  /*
  매서드
  객체(클래스)에서 행동을 뜻함.
  */
  introduce() {
    return `${this.name}의 나이는 ${this.age} 입니다`;
  }
}

/*
인스턴스
-클래스에서 파생된 고유한 것
-실제로 생성된 후 메모리에 올라감
 */
const p1 = new Person("Lee", 100);
const p2 = new Person("Kim", 30);

console.log("p1: ", p1.introduce());
console.log("p2: ", p2.introduce());
