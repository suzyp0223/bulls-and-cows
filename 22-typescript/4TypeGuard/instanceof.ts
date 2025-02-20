/*
instanceof
JS에 이미 존재
instanceof 연산자는 생성자의 prototype  속성이
객체의 프로토타입 체인 어디에 존재하는지 판별
 */

function getDate(date: Date | string): Date {
  if (date instanceof Date) {
    return date;
  }
  return new Date(date);
}
