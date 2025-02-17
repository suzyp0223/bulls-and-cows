// 타입가드 typeof
// JS에서 이미 존재하는 타입 검사 연산자

function print(value: number | string): string {
  if (typeof value === "number") {
    return String(value);
  }

  if (typeof value === "string") {
    return value;
  }
  return value;  //undefined인 경우 리턴
}
