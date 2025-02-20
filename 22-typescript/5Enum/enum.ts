/*
Enum 열거형
의미있는 상수자료를 정의하여 문서화
enum키워드 + 파스칼케이스
 */

// 콘솔 출력 가능
enum Prize {
  Gold,
  Silver,
  Bronze,
}
console.log(Prize.Gold); //100
console.log(Prize["Gold"]); //100

// 콘솔 출력 안됨.
interface Inter {
  name: "name";
}

// 숫자 열거형 -지정없을시 자동으로 인덱스번호로 시작, 자동증가.

// 문자 열거형 - 모든 값을 매핑해야함

// 혼합형 열거형 Heterogeneous - 지원은 하지만 비추
enum Dummy {
  First = 0,
  Silver = "Silver",
}
enum BoolLikeEnum {
  No = 0,
  Yes = "YES",
}



