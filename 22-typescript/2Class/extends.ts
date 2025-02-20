/*
extends
상속
확장
*/

class 기본 {
  result() {
     return 'Base'
   }
}

class 파생 extends 기본 {

}

const de =  new 파생();

console.log('de: ', de);
