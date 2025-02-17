// 함수타입
/**
 * Function Type
 *
 * 1. 매개변수
 * 2. 반환 - 타입추론가능 (생략O)
 *
 */

// func(): string 반환타입은 타입추론이 잘되서 필수로 적을 필요 없음.
function func(num: number, str: string): string {
  return num + str;
}
func(123,'str');

function func2(num2: number, str2: string): number {
  return num2 + Number(str2);
}
func(123,'123');

function func3(num3: number, str3: string): void {
  console.log(num3 + str3);
}
func(123,'123');

const func4 = (str1: string, str: string): string => {
  return str1 + str;
}
func4('hello','123');

const func5 = (obj: {str1: string, str: string}) => {
  return obj.str1 +'' + obj.str;
}
func5({str1: 'hello', str: '123'});
