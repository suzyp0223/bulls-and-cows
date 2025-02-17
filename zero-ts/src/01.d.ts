declare enum Desk {
    Color = "White",
    Width = 1400
}
declare const enum Language {
    TypeScript = "TS",
    JavaScript = "JS",
    Java = "JAVA",
    Ruby = "RB"
}
declare const Language2: {
    readonly TypeScript: "TS";
    readonly JavaScript: "JS";
    readonly Java: "JAVA";
    readonly Ruby: "RB";
};
type LangCode1 = keyof Language;
type LangCode2 = typeof Language;
type LangCode3_1 = keyof typeof Language;
type LangCode3_2 = "TypeScript" | "JavaScript" | "Java" | "Ruby";
declare function getLang(langCode: LangCode3_1): void;
