// 배열타입  Array Type  js에서 배열은 객체로 취급. 객체는 가변적 요소.

// strArr, strArr2는 같음, 표기만 다름
const strArr: string[] = ['str', 'str2', 'str3'];
const strArr2: Array<string> = ['str', 'str2', 'str3'];

const numArr: Array<number> = [1,2,3,];
const boolArr: boolean[] = [false, true, false, true];

strArr.push(1)
numArr.push('str')
boolArr.push(false)


// Tuple
const Arr = ['str', 123, false];
