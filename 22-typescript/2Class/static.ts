// static

class StaticClass {
  private static type = 'Type'
  static name = 'name'

  static getType() {
    return  StaticClass.type;
    // return  this.type;
  }
}

// console.log(StaticClass.type);
console.log(StaticClass.getType())