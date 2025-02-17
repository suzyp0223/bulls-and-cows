// tuple type 튜플타입
/**
 길이고정 & 인덱스 타입이 고정
  여러 다른 타입으로 이루어진 배열을 안전하게 관리
  배열 타입의 길이 조절
 */

const arr: string[] = ["a", "b", "c"];

const tuple: [number, string] = [1, "a"]; // 튜플(tuple) 타입이며, 고정된 길이와 정해진 타입 순서를 가지는 배열
const tuple0: (string | number)[] = [1, "a"]; //tuple0은 유니온타입 길이가 고정되지 않고 순서 상관없음.

const tuple2: [number, ...string[]] = [1, "a", "b", false];
