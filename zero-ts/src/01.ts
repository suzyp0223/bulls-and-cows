// 컴파일 명령어 - - tsc src/01.ts --declaration

enum Desk {
  Color = "White",
  Width = 1400,
}

Desk.Color;


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


type LangCode1 = keyof Language;
type LangCode2 = typeof Language;

type LangCode3_1 = keyof typeof Language;
type LangCode3_2 = "TypeScript" | "JavaScript" | "Java" | "Ruby";

function getLang(langCode: LangCode3_1) {
  console.log(langCode);
}

getLang('Java');