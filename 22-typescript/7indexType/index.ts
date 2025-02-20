/*
Index 타입 다루기
 */
interface Todo {
  id: number
  content: string
}

// Indexed Access Type
type TodoId = Todo['id']


interface StrInterface {
  [index: number]: string
  name: string
  age: number
  // [index: number]: number
}

// 인터페이스에 정의하지 않은 타입을 정의하면 genderType처럼 오류가 남
const Person: StrInterface = {
  99: '구구',
  name: '박',
  age: 99,
  // genderType: 'F',
}