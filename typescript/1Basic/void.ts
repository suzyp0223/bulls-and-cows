// void

/*
  함수의 반환이 없는 경우를 명시
  타입 추론에 위임하자!!
  -> void는 타입명시 없어도
  암시적으로 void로 추론.

  JS에서는 암시적으로 undefined 반환.
  그러나 void와 undefined는 TS에서 같지 않음.
 */

function test(): undefined {}

function test2(): void {}
function voidFunc() {}
console.log(test());
