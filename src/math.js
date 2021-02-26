//
// var math = math || {};  // or 연산자 : 참이면 첫번째, 거짓이면 두번째 값 할당. math 가 선언되지 않았었다면 빈 객체를 할당한다. (falsy -> false, undefined, 0, null 등)
//
// // IIFE
// (function () {
//     function sum(a, b) {
//         return a + b;
//     }
//
//     math.sum = sum; // sum 함수를 math 모듈 외부에서도 사용가능 하게끔 전역 네임스페이스 math 에 sum 함수를 할당
// })();

export function sum(a, b) {
    return a + b;
}