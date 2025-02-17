// 컴파일 명령어 - - tsc src/01.ts --declaration
var Desk;
(function (Desk) {
    Desk["Color"] = "White";
    Desk[Desk["Width"] = 1400] = "Width";
})(Desk || (Desk = {}));
Desk.Color;
var Language2 = {
    TypeScript: "TS",
    JavaScript: "JS",
    Java: "JAVA",
    Ruby: "RB",
};
function getLang(langCode) {
    console.log(langCode);
}
getLang('Java');
