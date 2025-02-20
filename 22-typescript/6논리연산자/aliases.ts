// Type Aliases 타입 별칭
type str = string;
type num = number;
type arr = num[];

type func = () => void;

type Information = {
  name: str;
  age: num;
  counts: arr;
};

interface PersonInterface {
  name: str;
  age: num;
  counts: arr;
}

// ------------------------------------------
/*
  Union 타입 유니언 타입  (합집합)
  둘을 합친 결과, 둘 중 하나
*/
type StringOrNumber = string | number; // string, number 둘다 수용할수 있는 공용타입
type GenderType1 = "M" | "F";

const a: StringOrNumber = "STR";
const b: StringOrNumber = 123;
// const c: StringOrNumber = boolean

type People = {
  name: string;
  age: number;
};

type Me = {
  name: string;
  genderType1: GenderType1;
};

const combine: People | Me = {
  name: "Park",
  age: 100,
  genderType1: "F",
};

// ------------------------------------------
/*
  Intersection 타입 (교집학)
  둘의 공통 분모
*/
type StringAndNumber = string & number; // string 이명서 number인것을 만족해야함.
type GenderType2 = "M" | "F";

// const a1: StringAndNumber = "STR";
// const b1: StringAndNumber = 123;
// const c1: StringAndNumber = boolean;

type Human = {
  name: string;
  age: number;
};

type Girl = {
  name: string;
  genderType2: GenderType2;
};

const Total: Human & Girl = {
  // 모두를 만족시키지 않으면 에러남. 3개다 있어야함.
  name: "Park",
  age: 100,
  genderType2: "F",
};

// ------------------------------------------
/*
  유니언 타입 판별
  추론하기 어려운 유니온 타입을 추론하기 위함
*/
interface Male {
  name: string;
  age: number;
  genderType: "M";
}
interface Female {
  name: string;
  age: number;
  genderType: "F";
}

type Person = Male | Female; // 타입가드를 사용해야함. 불리언으로 되는것은 추론이 어려워서.
function createMale({ name, age, genderType }: Person): Male {
  return {
    name,
    age,
    genderType,
  };
}

function createFemale({ name, age, genderType }: Person): Female {
  return {
    name,
    age,
    genderType,
  };
}
