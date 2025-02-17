// 객체타입 = any와 다른게 없음
const obj: object = {
  str: "str",
  num: 123,
  child: {
    str: "str",
    num: 123,
  },
};
console.log("obj.str", obj.str);

const obj2: {
  str: string;
  num: number;
  child: {
    str: string;
    num: number;
  };
} = {
  str: "str",
  num: 123,
  child: {
    str: "str",
    num: 123,
  },
};
console.log("obj2.str", obj2.str);


