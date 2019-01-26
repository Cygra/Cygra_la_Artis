function seqSearch(arr, data) {
  let len = arr.length
  for(let i = 0; i < len; i ++) {
    if (arr[i] === data) return true
  }
  return false
}

function findMin(arr) {
  let min = arr[0]
  let len = arr.length
  for (let i = 1; i < len; i ++) {
    if (arr[i] < min) min = arr[i]
  }
  return min
}

function findMax(arr) {
  let max = arr[0]
  let len = arr.length
  for (let i = 1; i < len; i ++) {
    if (arr[i] > max) max = arr[i]
  }
  return max
}
