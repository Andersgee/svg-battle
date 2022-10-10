export function calcScore(percent: number, codeLength: number) {
  if (percent < 100) {
    return percent;
  }
  //basic linear score
  //with minimum of 100 at 10k chars
  //and maximum of 10100 at 0 chars

  //calcScore(99, 130) => 99
  //calcScore(100, 130) => 9970
  //calcScore(100, 129) => 9971
  //calcScore(100, 0) => 10100
  return -(codeLength - 10000) + 100;
}
