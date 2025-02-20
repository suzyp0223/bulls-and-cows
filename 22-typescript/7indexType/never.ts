/**
 * 타입단언
 * never
 *
 * - 일부 함수의 반환이 없는 경우를 명시
 * - 예외를 던지거나 실행이 종료될때
 */
function someError(message: string): never {
  throw new Error(message);
}

function someFunc(param: string | number) {
  if (typeof param === "string") {
  } else if (typeof param === "number") {
  } else {
    // some never
  }
}

// 유니언 타입에서 제거가 됨
type StrUnion = never | string;

// 교차 타입에서는 덮어씀
type NeverInter = never & string;
