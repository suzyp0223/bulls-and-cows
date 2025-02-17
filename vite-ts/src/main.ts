import "./style.css";

type Operator = "+" | "-" | "×" | "÷" | "=";

interface CalculatorInterface {
  tempValue: string | number;
  tempOperator?: Operator | string;
  render(inputValue: string | number): void;
  reset(): void;
  calculate(operator: Operator | string): void;
  initEvent(): void;
}
type ComputedValue = {
  [key in Exclude<Operator, "=">]: (num1: number, num2: number) => number;
};

const VALID_NUMBER_OF_DIGITS = 3;
const INIT_VALUE = 0;
const OPERATORS = ["+", "-", "×", "÷"];

// const resultEl = document.querySelector('#result') as HTMLElement;
// const resultEl = <HTMLDivElement>document.querySelector("#result");
// if (resultEl) {
//   resultEl.innerText = String(99999);
// }
// resultEl.addEventListener("click", function ({ target }: MouseEvent) {
//   if (target) {
//     alert((target as HTMLDivElement).innerText);
//   }
// });

// function onClickButton() {
//   const buttonContainerEl = document.querySelector(".contents");
//   // buttonContainerEl?.addEventListener("click", console.log);
//   // console.log((target as HTMLButtonElement).innerText);
//   buttonContainerEl?.addEventListener("click", function ({ target }) {
//     const buttonText = (target as HTMLButtonElement).innerText;
//     if (buttonText === "AC") {
//       this.reset();
//     } else {
//     }
//   });
// }

const validateNumberLength = (value: string | number) => {
  return String(value).length < VALID_NUMBER_OF_DIGITS;
};

const isZero = (value: string) => {
  // Number()로 변환시 0이 되는 것 -> 공백, 빈문자열, 0.0, '0', '00', '000' / '문자열'은 NaN
  const num = Number(value);
  return !Number.isNaN(num) && num === INIT_VALUE;
};

const getComputedValue: ComputedValue = {
  "+": (num1, num2) => num1 + num2,
  "-": (num1, num2) => num1 - num2,
  "×": (num1, num2) => num1 * num2,
  "÷": (num1, num2) => num1 / num2,
};

const Calculator: CalculatorInterface = {
  tempValue: INIT_VALUE,
  tempOperator: undefined,
  render(inputValue: string | number) {
    const resultEl = <HTMLDivElement>document.querySelector("#result");
    const prevValue = resultEl.innerText;

    if (!validateNumberLength(prevValue)) {
      alert("3자리 이상의 숫자를 입력할 수 없습니다");
      return;
    }

    if (resultEl) {
      // 이전 값이 0이면 새로들어온 값을 넣고 그렇지 않으면 이전 값과 새로들어온 값을 더한다.
      resultEl.innerText = isZero(prevValue)
        ? String(inputValue)
        : String(prevValue + inputValue);
    }
  },
  reset() {
    const resultEl = <HTMLDivElement>document.querySelector("#result");

    resultEl.innerHTML = String(INIT_VALUE);
    this.tempValue = INIT_VALUE;
    this.tempOperator = undefined;
  },

  calculate(operator: Operator | string) {
    const isTempCalculated = OPERATORS.includes(operator);
    const isReadyCalculated =
      operator === "=" &&
      this.tempOperator &&
      OPERATORS.includes(this.tempOperator);

    if (isTempCalculated) {
      const resultEl = <HTMLDivElement>document.querySelector("#result");

      this.tempOperator = operator;
      this.tempValue = Number(resultEl.innerHTML);
      resultEl.innerHTML = String(INIT_VALUE);

      return;
    }

    if (isReadyCalculated) {
      const resultEl = <HTMLDivElement>document.querySelector("#result");
      const resultValue = getComputedValue[
        this.tempOperator as Exclude<Operator, "=">
      ](Number(this.tempValue), Number(resultEl.innerText));

      resultEl.innerText = String(resultValue);
    }
  },
  initEvent() {
    // onClickButton();
    const buttonContainerEl = document.querySelector(".contents");

    buttonContainerEl?.addEventListener("click", ({ target }) => {
      // function으로 하면 this.reset()에서 this에러가남.
      const buttonText = (target as HTMLButtonElement).innerText;

      if (buttonText === "AC") {
        this.reset(); // this 는 이벤트 타겟 , 함수로 바인딩된 것

        return;
      }

      if (OPERATORS.concat('=').includes(buttonText)) {
        this.calculate(buttonText);

        return;
      }

      if (!Number.isNaN(buttonText)) {
        this.render(Number(buttonText));
      }
    });
  },
};

Calculator.render(INIT_VALUE);
Calculator.initEvent();
