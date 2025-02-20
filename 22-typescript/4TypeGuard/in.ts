/*
in
JS에서 객체가 특정 속성을 가지고 있는지 검사를 통해 불리언으로 반환

*/
interface Dog {
  name: string;
  bark(): '멍멍';
}

interface Cat {
  name: string;
  meow(): '냐옹';
}

function sayAnimal(animal:Dog | Cat) {
  if ('bark' in animal) {
    animal.bark();
    animal.name;
  }

  if ("meow" in animal) {
    animal.meow();
  }
}