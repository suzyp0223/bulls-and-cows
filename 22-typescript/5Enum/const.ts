// const 열거.
// 숫자, 문자, 복합 3가지 타입
enum Desk {
  Color = "White",
  Width = 1400,
}

Desk.Color;
Desk.Height; //Height 존재하지 않는 열거형.
Desk["Height"];
// Cannot find name 'Height' 오류뜸. 열거형은 기본적으로 불안전한 접근을 허용하기 때문.
// 따라서 const enum 으로 사용하기도 한다.

// 열거형 활용
const enum Language {
  TypeScript = "TS",
  JavaScript = "JS",
  Java = "JAVA",
  Ruby = "RB",
}
const Language2 = {
  TypeScript: "TS",
  JavaScript: "JS",
  Java: "JAVA",
  Ruby: "RB",
} as const;

// type Lang = 'TS' | 'JS'
type LangCode1 = keyof Language;
type LangCode2 = typeof Language;

type LangCode3_1 = keyof typeof Language;
type LangCode3_2 = "TypeScript" | "JavaScript" | "Java" | "Ruby";

function getLang(langCode: LangCode3_1) {
  console.log(langCode);
}

// function getLang(langCode: string) { // string 타입은 any 큰 차이가 없음.
// console.log(langCode);
// }
// getLang('아무 언어');
// getLang("Python");
