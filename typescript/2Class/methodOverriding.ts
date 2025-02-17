// Method Overriding  메서드 오버라이딩

class Animals {
  run() {
   return `Animal이 달린다`
 }
}

class Dogs extends Animals {
  run() {
    return 'Dog가 달린다'
  }
}

class Runner extends Animals {
  run() {
    return "Runner가 달린다";
  }
}

const a = new Animals();
const d = new Dogs();
const r = new Runner();
console.log(a.run());  //"Animal이 달린다"
console.log(d.run());  //"Dog가 달린다" 
console.log(r.run()); //"Runner가 달린다"
