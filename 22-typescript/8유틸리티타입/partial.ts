import { NameOrArn } from "aws-sdk/clients/lookoutequipment";

/**
 * 유틸리티 타입
 * - 전역으로 사용 가능한 편리한 타입 변환 도구
 * - 이해하고 사용하면 생산성 증가
 * - 이해하기 위해 직접 만들고 직접 사용하면 이해도도 높아집니다.
 */
interface Person {
  name: string;
  age: number;
}
const arr = [];
// arr.
const str = "";
// str.
type T1 = Partial<Person>;
type T2 = Required<Person>;

//partial- ? 옵셔널로 바꿔줌
type PersonOpt = Partial<Person>;

function getInfo(p: PersonOpt) {
  return p;
}

//required - 모든 집합을 필수로 표현
interface Animal {
  name: string;
  type?: string;
}

type AnimalRequired = Required<Animal>;

function getInfo1(p: Animal) {
  return p;
}
getInfo1({ name: "str" });

// readonly -
const animal: Animal = {
  name: "Dog",
  type: "강아지",
};
animal.type = "고양이";
console.log("animal: ", animal); //  name: 'Dog', type: "고양이";

// ---readonly 적용 후
const animalReadonly: Readonly<Animal> = {
  name: "Dog",
  type: "강아지",
};
animalReadonly.type = "고양이"; //error

// record - union과 많이 비교됨
// 주로 라우터 많들때 사용
type Path = "home" | "order" | "cart";
const navPath: Record<Path, string> = {
  home: "Home",
  order: "Order",
  cart: "Cart",
};

interface PathURL {
  path: string;
}
// <키, 타입>
const navPath2: Record<Path, PathURL> = {
  home: {
    path: "/home",
  },
  order: {
    path: "/order",
  },
  cart: {
    path: "/cart",
  },
};

//omit - 불필요한 속성을 드러낼때 사용
interface Friends {
  name: string;
  age: number;
  tel: number;
}

type BaseInfoFriends = Omit<Friends, "age">;

const myFriends: Friends = {
  name: "친구",
  tel: 112,
  age: 100,
};

// pick - 필요한것만 가져올때 사용
type NameAndTelPerson = Pick<Friends, "name" | "tel">;
const me: NameAndTelPerson = {
  name: "me",
  tel: 112,
};

// exclude - union 타입을 위한 유틸리티타입
// Exclude<타입, 제외할 유니온 멤버>
type Animal3 = "Man" | "Woman" | "Cat" | "Dog";

type Person3 = Exclude<Animal3, "Cat" | "Dog">;
type DogAndCat = Exclude<Animal, "Man" | "Woman">;
type Example = Exclude<"Man" | "Woman" | "Cat" | "Dog", "Man" | "Woman">;
type Example2 = Exclude<string | number | boolean, boolean>;

// extract -
// Extract<타입, 교집합 시킬 수 있는 유니온 멤버>
type Example3 = Extract<"1" | "2" | "3", "3" | "4" | "5">;
type Example4 = Extract<string | number | boolean, boolean>;

// non nullable - 정의되지 않은 것을 제거
type Type1 = NonNullable<string | number | boolean | undefined>;
type Type2 = NonNullable<string | null | boolean | undefined>;
type Type3 = NonNullable<string | null | 0 | undefined>;
type Type4 = NonNullable<{} | undefined>;
type Type5 = NonNullable<{
  name: string;
  age: undefined;
}>;

// parameters - tuple만들어줌 - 함수에 매개변수를 추출해줌.
// Parameters<타입>
type Tuple1 = Parameters<(n1: number, n2: number) => void>
type Tuple2 = Parameters<<T>(param: T) => T>
type Tuple3 = Parameters<(param: any) => void>
type Tuple4 = Parameters<any>
// type Tuple5 = Parameters<string>
// type Tuple6 = Parameters<number>
type Tuple7 = Parameters<never>
type Tuple8 = Parameters<<T>(...args: T[]) => void>

// return type - 함수의 반환타입을 바로 빼줌
function func(s:string): string  {
  return  s
}

type Return1 = ReturnType<() => string>
type Return2 = ReturnType<() => void>
type Return3 = ReturnType<() => unknown>
type Return4 = ReturnType<() => null>
type Return5 = ReturnType<<T>(p: T) => T>
type Return6 = ReturnType<typeof  func>
// type Return8 = ReturnType<string>
// type Return9 = ReturnType<Function>

//instance type -
class BaseClass {

}
const P = new BaseClass();
type In1 = InstanceType<typeof BaseClass>
// type In2 = InstanceType<string>
// type In3 = InstanceType<typeof P>
