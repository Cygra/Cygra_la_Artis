function recurFib(n) {
  if (n < 2) return n
  return recurFib(n - 1) + recurFib(n - 2)
}

function dynFib(n) {
  let val = Array(n).fill(0)
  if ([1, 2].includes(n)) return 1
  else {
    val[1] = 1
    val[2] = 1
    for (let i = 3; i <= n; i ++) {
      val[i] = val[i - 1] + val[i - 2]
    }
    return val[n]
  }
}

var startR = new Date();
recurFib(30)
console.log(new Date() - startR)

var startD = new Date();
dynFib(30)
console.log(new Date() - startD)
