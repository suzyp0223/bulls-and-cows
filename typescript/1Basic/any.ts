// any type
/*
  모든 값(타입)의 집합
  사용하지 말자
  JS가 됨.

  noImplicitAny or strict 옵션 true 권장
*/

function func(anyParam:any) {
  anyParam.trim()
}
func([1,2,3])