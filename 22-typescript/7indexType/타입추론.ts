/**
 * 타입 추론
 * - 명시적으로 타이핑을 하지 않았을때 TS가 그 코드의
      타입을 해석해 나가는 방식
- 예를 들어
    - `const` ⇒ 리터럴 타입으로 추론
    - `let` ⇒ 기본 타입으로 추론


## 일반적인 타입 추론 (**Best common type)**

- 여러 식에서 타입을 유추해 **가장 일반적인 타입**을 계산
    - 각 후보 타입을 고려하고 다른 모든 후보 타입과 호환되는
       타입을 선택하는 알고리즘

## 문맥상 타이핑 (**Contextual Typing)**

- 타입 추론은 오히려 `반대로` 동작하는 경우가 있다.
    - 이것을 **Contextual Typing**이라 ****부름
- 문맥상 타입 지정은 표현식 타입이 위치에 의해 암시적인 경우 발생
 *
 */
let str = "string";
const str2 = "string";

type Obj = {
  name: string;
};

interface IObj {
  name: string;
}

const div = document.querySelector("div");

div?.addEventListener("click", function (event: MouseEvent) {
  event.mouse;
});
