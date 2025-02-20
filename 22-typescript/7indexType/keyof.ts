/**
 * 타입단언
 * keyof 타입 연산자
 *
 * - 객체 타입의 키를 (문자열 or 숫자) 유니언 타입으로 생성
 * - 리터럴 집합으로 만들어진 유니언 타입을 만들때 유용
 * - 맵드 타입과 사용시에는 더욱 유연하게 활용 가능
 */
interface Size {
  width: number;
  height: number;
}

type S = keyof Size; // 'width' | 'height'

function getSize(size: S) {
  return size;
}

getSize(1111);
getSize("width22");
getSize("width");
getSize("height");

const SizeType = {
  width: "Px",
  height: "Px",
} as const;

type SizeTypeValue = (typeof SizeType)[keyof typeof SizeType];
