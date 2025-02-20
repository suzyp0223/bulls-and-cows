/**
 * 타입 단언
 *
 * - **TypeScript가 알 수 없는 타입**에 대한 정보가 있을 때
    - 타입 단언을 사용하여 보다 **구체적인 타입을 지정**할 수 있다.
- 하지만 컴파일 타임에 제거되기 때문에 관련된 런타임 검사가 없다.
    - 즉 타입 단언이 잘못된 경우 **null이나 예외를 발생시키지 않음**
- `as` 혹은 `<>` 구문으로 사용 가능
 */
const div = document.querySelector(".ts-wrapper") as HTMLDivElement;
// const div2 = <HTMLDivElement>document.querySelector('.ts-wrapper')

const str = "Hello" as unknown as number;
