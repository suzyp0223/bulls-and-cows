/*
선언 병합
- TypeScript에서 특이한 개념
- 컴파일러가 동일한 이름으로 선언된 두 개의 각기 다른 선언을
하나의 정의로 병합하는 것
- 단 원래의 기능이 모두 포함되며 여러 선언을 병합할 수 있다.
- TypeScript에서 선언은 네임스페이스, 타입 또는 값의
세 그룹 중 적어도 하나에 엔터티를 만든다.
- 네임스페이스는 점으로 구분된 표기법을 사용하여 액세스하는
이름을 포함하는 영역을 생성
 */

interface Cat {
  name: string
}

interface Cat {
  age: number
}

const animal: Cat = {
  name: 'cat',
  age: 99
}

interface Person {
  name: string
  age: number
}

const Person = {
  name: 'Jang',
  age: 99
}

export {
  Person
}

class Car {
  static createCar(): Car {
    return {
      name: 'Car'
    }
  }
}

namespace Car {
  function createCar(): Car {
    return Car.createCar()
  }
}

interface Car {
  name: string
  brandType?: string
}

export {
  Car
}