/**
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/eval#eval%EC%9D%84%20%EC%A0%88%EB%8C%80%20%EC%82%AC%EC%9A%A9%ED%95%98%EC%A7%80%20%EB%A7%90%20%EA%B2%83!
 *
 */
function TryEval() {
  console.log(eval('2 + 2'));
  // Expected output: 4

  console.log(eval(new String('2 + 2')));
  // Expected output: 2 + 2

  console.log(eval('2 + 2') === eval('4'));
  // Expected output: true

  console.log(eval('2 + 2') === eval(new String('2 + 2')));
  // Expected output: false
}

function TestEvalScope() {
  var x = 2, y = 4;
  console.log(eval('x + y')); // 직접 호출, 지역 범위 사용, 결과값은 6
  var geval = eval; // eval을 전역 범위로 호출하는 것과 같음
  console.log(geval('x + y')); // 간접 호출, 전역 범위 사용, `x`가 정의되지 않았으므로 ReferenceError 발생
  (0, eval)('x + y'); // 다른 방식으로 간접 호출
}

// TryEval();
// TestEvalScope();
