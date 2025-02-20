// undefined & null - 둘중 하나만 사용하는 것이 좋음.
/*
  JS에서와 마찬가지로 고유의 특별한 타입으로 인정
  void, never와 같이 더 세밀한 타입도 제공.

  strictNullChecks가 핵심
*/

const nu: null = null;
const un: undefined = undefined;
console.log(nu === un); // true; 느슨한 검사

function sayHello(word: string) {
  // 리턴타입이 자동으로 string | undefined
  if (word === "world") {
    return "hello" + word;
  }
  return null;
}

function log(message: string | number) {
  console.log(message);
}
