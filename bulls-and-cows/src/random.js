export function generateRandomNumber() {
  // 1~9까지 숫자를 이용
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // 랜덤하게 섞어서 4자리 숫자만 이용할 예정
  const pickedNumbers = shuffled(candidates).splice(0, 4); // 4자리를 뽑음

  return pickedNumbers;
}

function shuffled(array) {
  // Math.random(), 0~1까지 랜덤하게 선택
  // array.sort()

  // array.sort(() => 음수를 반환하면 내림차순 정렬,  양수 반환하면 오름차순 정렬)
  return array.sort(() => {
    return Math.random() - 0.5; // 50% 확률로 -0.5~ 0.5 사이값이 반환됨.
    //  결국 음수 or 양수가 반환되므로 배열이 무작위로 섞임.
  });
}
