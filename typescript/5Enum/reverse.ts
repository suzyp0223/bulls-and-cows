// reverse mapping 리버스매핑 역방향 찾기

enum Order {
  // name = value
  First = 1,
  Second = 2,
  Third = 3,
}

const firstVal = Order.First;
const KeyFirstVal = Order[firstVal];

console.log("firstVal: ", firstVal); // 1
console.log("KeyFirstVal: ", KeyFirstVal); // "First"
