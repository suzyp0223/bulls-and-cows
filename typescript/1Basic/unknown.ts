// unknown
/*
  새로운 최상위 타입
  any처럼 모든 값을 허용하지만 상대적으로 엄격.
  TS에서 unknown으로 추론하는 경우는 없으니 개발자가 직접 명시해야함
  assertion 혹은 타입 가드와 함께 사용.
*/
// // 오류 없음
// let num: any = 100;
// num.trim();

// 코드실행시 에러잡음.
let num: unknown = 100;
if (typeof num === 'string') { //타입이 맞는지 검증하는 타입가드
  num.trim();
}


// function func(x:any) {    // 최상위라서 에러 하나도 없음.
// function func(x: unknown) {  // any, unknown만 에러 없음.
//   let val1: any = x;
//   let val2: unknown = x;
//   let val3: string = x;
//   let val4: boolean = x;
//   let val5: number = x;
//   let val6: string[] = x;
//   let val7: {} = x;
// }
