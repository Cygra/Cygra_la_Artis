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

function lcs(word1, word2) {
  if (word1 === word2) return word1
  let max = 0
  let index = 0
  let lcsarr = new Array(word1.length + 1)
  for (let i = 0; i < word1.length + 1; i ++) {
    lcsarr[i] = new Array(word2.length + 1)
    for (let j = 0; j < word2.length + 1; j ++) {
      lcsarr[i][j] = 0
    }
  }

  for (let i = 0; i < word1.length + 1; i ++) {
    for (let j = 0; j < word2.length + 1; j ++) {
      if (i === 0 || j === 0) {
        lcsarr[i][j] = 0
      } else {
        if (word1[i - 1] === word2[j - 1]) {
          lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1
        } else {
          lcsarr[i][j] = 0
        }
      }
      if (max < lcsarr[i][j]) {
        max = lcsarr[i][j]
        index = i
      }
    }
  }

  console.log(lcsarr)
  console.log('max = ', max)
  console.log('index = ', index)

  let str = ''
  if (max === 0) {
    return str
  } else {
    for (let i = index - max; i < max; i ++) {
      str += word2[i]
    }
    return str
  }
}

console.log(lcs('sabbcc', 'fabbcc'))
