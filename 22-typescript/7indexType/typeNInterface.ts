/**
 * Type Aliases vs Interfaces
 *
 * https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
 *
 * - 각자 다른 개념이지만 비슷한 점도 많고 다른 점도 있어 알아둘 것이 많다.
 * - 둘다 많이 사용되는 키워드
 * - 둘다 많이 사용되면서 또 비슷한 역할을 대체하는 경우도 있다.
 *
 * - 이미 이 내용에 정답이 있는 것은 아니지만, 팀 & 개인의 규칙이나 선호도에 따라 다른 방식으로 사용될 수 있다.
 * - 비교표 수시로 찾아서 확인해보자
 * - 항상 최신 자료를 확인해야한다 (필수)
 */
interface IAnimal {
  name: string;
}

interface IBear extends IAnimal {
  honey: boolean;
}

type TAnimal = {
  name: string;
};

// interface는 Type Aliases를 확장할 수 있다.
interface IBear2 extends TAnimal {
  honey: boolean;
}

// Error
// type TBear extends IAnimal = {}
// type TBear extends TAnimal = {}

type TBear = TAnimal & {
  honey: boolean;
};

// 위의 중복선언 인터페이스와 선언 병합됨
interface IAnimal {
  age: number;
}

const AnimalImpl: IAnimal = {
  name: "AnimalImpl",
  age: 99,
};

// 중복 선언이 불가능하다 (선언 병합 지원 X)
// type TAnimal = {
//     age: number
// }

class Dog implements IAnimal {
  name = "Dog";
  age = 99;
}

class Dog2 implements TAnimal {
  name = "Dog";
  age = 99;
}

type CatType =
  | "City"
  | ("Forest" & {
      meow(): string;
    });

type S = string;
type N = number;
type B = boolean;
// type CatType = 'City' | 'Forest'

// interface CatType {
//     'City' | 'Forest' & {
//         meow(): string
//     }
// }

class Cats implements CatType {}
