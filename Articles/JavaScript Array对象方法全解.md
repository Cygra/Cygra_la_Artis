JavaScript Array对象方法全解

当我们在控制台里随便声明一个 `array` 并把它 log 出来，可以看到这个 `array` 的原型链上包括了如下方法：

```javascript
concat: ƒ concat()
constructor: ƒ Array()
copyWithin: ƒ copyWithin()
entries: ƒ entries()
every: ƒ every()
fill: ƒ fill()
filter: ƒ filter()
find: ƒ find()
findIndex: ƒ findIndex()
forEach: ƒ forEach()
includes: ƒ includes()
indexOf: ƒ indexOf()
join: ƒ join()
keys: ƒ keys()
lastIndexOf: ƒ lastIndexOf()
length: 0
map: ƒ map()
pop: ƒ pop()
push: ƒ push()
reduce: ƒ reduce()
reduceRight: ƒ reduceRight()
reverse: ƒ reverse()
shift: ƒ shift()
slice: ƒ slice()
some: ƒ some()
sort: ƒ sort()
splice: ƒ splice()
toLocaleString: ƒ toLocaleString()
toString: ƒ toString()
unshift: ƒ unshift()
values: ƒ values()
Symbol(Symbol.iterator): ƒ values()
Symbol(Symbol.unscopables): {copyWithin: true, entries: true, fill: true, find: true, findIndex: true, …}
__proto__: Object
```

这些是我们声明的 `array` 从 `Array` 上继承的。

---
`concat()`方法用于按顺序拼合多个数组。

```javascript
var arr1 = [1, 2, 3]
var arr2 = [1, 2, 4]

console.log(arr1.concat(arr2))
// [1, 2, 3, 1, 2, 4]
```

---
`copyWithin(arg1, arg2, arg3)`方法用于将数组中从指定位置 `arg2` 到指定位置 `arg3` （而不包含此位置）的数组片段复制到指定位置 `arg1`。

此方法的第一个参数为目标位置索引，若为负则从末尾开始计算。

后两个参数为被复制部分的起始索引，若为负则从末尾开始计算。若未提供第三个参数，则复制到数组末尾。被复制的片段将会覆盖从目标位置开始相应长度的部分。

```javascript
var arr = ['a0', 'b1', 'c2', 'd3', 'e4', 'f5']

console.log(arr.copyWithin(0, 3, 5))
// ["d3", "e4", "c2", "d3", "e4", "f5"]
```

---
`fill(arg, start, end)`方法用于将数组中从指定位置 `start` 到指定位置 `end` （而不包含此位置）的数组片段填充为 `arg`。

后两个参数为被覆盖部分的起始索引，若为负则从末尾开始计算，默认值为 `0`。若未提供第三个参数，则覆盖到数组末尾。

```javascript
var arr = ['a0', 'b1', 'c2', 'd3', 'e4', 'f5']

console.log(arr.copyWithin(0, 3, 5))
// ["a0", "b1", "c2", "foo", "foo", "f5"]
```

---
`entries()` 方法返回一个新的 `Array Iterator` 对象，该对象包含数组中每个索引的键/值对。
`keys()` 方法返回一个包含数组中每个索引键的 `Array Iterator` 对象。
`values()` 方法返回一个包含数组中每个索引值的 `Array Iterator` 对象。

```javascript
var arr = ['a', 'b', 'c']
var iter_e = arr.entries()
var iter_k = arr.keys()
var iter_v = arr.values()

console.log(iter_e.next().value) // [0, "a"]
for (let k of iter_k) {
  console.log(k)
} // 0 1 2
for (let v of iter_v) {
  console.log(v)
} // "a" "b" "c"
```

---
`every()` 用于测试是否数组的每一个元素都通过了测试，全部通过方返回 `true`。

`some()` 用于测试是否数组中有元素可以通过测试，只要有元素通过便返回 `true`。若数组为空，返回 `false`。

```javascript
var arr = [1, 2, 3, 4, 5]

console.log(arr.every(i => i > 3))
// false
console.log(arr.some(i => i > 3))
// true
```

---
`filter()` 方法用于创建一个包含原数组中通过测试的元素组成的新数组。

```javascript
var arr = [1, 2, 3, 4, 5]

console.log(arr.filter(i => i > 3))
// [4, 5]
```

---
`find()` 方法用于寻找数组中第一个通过测试的元素。

`findIndex()` 方法与之类似，不过返回的是第一个通过测试的元素的索引或 `-1`。

其接受的第一个参数为用来测试数组中的元素的函数，这个函数接受三个参数：数组的元素、此元素的索引以及数组本身。这个方法还接受可选的第二个参数用作测试函数的 `this`。

```javascript
var arr = [1, 2, 3, 4, 5]

console.log(arr.find(i => i > 3))
// 4
console.log(arr.find((item, index, array) => item > 3 || index === 0))
// 1
console.log(arr.findIndex(i => i > 3))
// 3
```

---
`forEach()` 用于对数组中每个元素执行一次给定函数。

`map()` 与之类似，但会创建一个新数组。

其接受的第一个参数为用来对数组中的元素执行的函数，这个函数接受三个参数：数组的元素、此元素的索引以及数组本身。这个方法还接受可选的第二个参数用作测试函数的 `this`。

```javascript
var arr1 = [1, 2, 3, 4, 5]

arr1.forEach((item, index) => console.log(item + index))
// 1
// 3
// 5
// 7
// 9

var arr2 = arr1.map(i => i + 1)
console.log(arr2)
// [2, 3, 4, 5, 6]
```

---
`includes` 用来测试数组是否包含指定值。

`indexOf()` 可以用来返回被包含的指定值的索引或 `-1`。
`lastIndexOf()` 可以用来返回被包含的最后一个指定值的索引或 `-1`。

可选的第二个参数为 `fromIndex` 。

```javascript
var arr = [1, 2, 3, 4, 5, 5]

console.log(arr.includes(3))
// true
console.log(arr.includes(6))
// false
console.log(arr.indexOf(5))
// 4
console.log(arr.lastIndexOf(5))
// 5
```

---
`join()` 用来使用指定字符串连接数组中的每个元素并返回连接后的一个字符串。若未指定则用 `,` 分隔。

```javascript
var arr = [1, 2, 3, 4, 5]

console.log(arr.join())
// 1,2,3,4,5
console.log(arr.join('#'))
// 1#2#3#4#5

```

---
`pop()` 删除数组的最后一个元素并返回这个元素。
`push()` 在数组的末位插入元素。
`shift()` 删除数组的第一个元素并返回这个元素。
`unshift()` 在数组的第一位插入元素。

```javascript
var arr = [1, 2, 3, 4, 5]

arr.pop()
console.log(arr)
// [1, 2, 3, 4]

arr.push(6)
console.log(arr)
// [1, 2, 3, 4, 6]

arr.shift()
console.log(arr)
// [2, 3, 4, 6]

arr.unshift(0)
console.log(arr)
// [0, 2, 3, 4, 6]
```

---
`reverse()` 将一个数组前后颠倒。

```javascript
var arr = [1, 2, 3, 4, 5]
arr.reverse()

console.log(arr)
// [5, 4, 3, 2, 1]
```

---
`slice()` 提取数组中的一个片段且不修改原数组。

这个方法接收两个参数：第一个参数表示起始位置，默认为 `0`，若为负则从末尾开始计算。第二个参数表示截取片段的终止位置而不包括该位置，若不提供则截取到数组的最后一位，若为负则从末尾开始计算。所得片段包含起始位置，但不包含终止终止位置。

```javascript
var arr = [1, 2, 3, 4, 5]

console.log(arr.slice(1))
// [2, 3, 4, 5]
console.log(arr.slice(1, 3))
// [2, 3]
```

---
`sort()` 使用 [原地算法（ in-place algorithm ）](https://zh.wikipedia.org/wiki/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)并默认根据根据字符串 Unicode 码点来对数组进行排序并返回数组。此外，也可自定义排序函数。

```javascript
var arr = [4, 1, 7, 5, 3]

console.log(arr.sort((a, b) => a - b))
// [1, 3, 4, 5, 7]
console.log(arr.sort((a, b) => a < b ? -1 : a > b ? 1 : 0))
// [1, 3, 4, 5, 7]
```

对非 ASCII 字符串及其他情况的排序可参 [`Array.prototype.sort()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

---
`splice()` 方法可以在数组中插入元素或使用给定元素替换数组中的元素。

这个方法接收三个参数。

第一个参数为目标位置 `index`。第二个参数若为 `0`，则在指定位置插入元素，否则将移除数组中给定长度的元素并插入新元素，若大于 `index` 后的元素总数或未提供，则移除到数组末尾。最后一个参数为给定元素，若未提供则至移除数组中的元素。

```javascript
var arr = [1, 2, 3, 4, 5]
arr.splice(1, 2, 0)

console.log(arr)
// [1, 0, 4, 5]
```

---
`toLocaleString()` 和 `toString()` 对数组中的元素使用各自的方法。
- Object: [`Object.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString)
- Number: [`Number.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)
- Date: [`Date.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)


```javascript
var a = [1, '2', '3c', {foo: 'bar'}, [1, 2, 3]]

console.log(a.toString())
// 1,2,3c,[object Object],1,2,3
```

---
`reduce()` 使用累加器依次处理数组中的元素。
`reduceRight()` 与之相同只是处理顺序为由右至左。

这个方法接受两个参数，第一个参数为累加器，第二个参数为累加器的初始值。

其中。累加器接收四个参数，第一个参数为累加器上一次执行的结果或初始值，第二个参数为当前正在处理的元素。

可选的第三个参数为当前元素的索引。可选的第四个参数为调用 `reduce()` 方法的数组。

```javascript
var arr = [1, 2, 3, 4, 5]

var arr_reduced = arr.reduce((r, v) => r * v, 9)
// 9 * 1 * 2 * 3 * 4 * 5
console.log(arr_reduced)
// 1080
```

---
```javascript
function foo(i) {
  if (i < 0)
  return;
  console.log('begin:' + i);
  foo(i - 1);
  console.log('end:' + i);
}
foo(3);

// begin:3
// begin:2
// begin:1
// begin:0
// end:0
// end:1
// end:2
// end:3
```
