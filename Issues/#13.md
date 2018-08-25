Chrome DevTools 提供了丰富的 [API](https://developers.google.com/web/tools/chrome-devtools/console/console-reference?hl=zh-cn) 来辅助 Web 开发，例如：

---
`console.time([label])` 及 `console.timeEnd([label])` ：

用来启动及终止一个计时器，以统计执行代码所消耗的时间。

在控制台执行：

```javascript
console.time()
var arr = new Array()
for (var i = 0; i < 10; i++) {
  arr.push(i)
  console.log(arr)
}
console.timeEnd()
```

可得到输出：
```javascript
// [0]
// [0, 1]
// [0, 1, 2]
// [0, 1, 2, 3]
// [0, 1, 2, 3, 4]
// [0, 1, 2, 3, 4, 5]
// [0, 1, 2, 3, 4, 5, 6]
// [0, 1, 2, 3, 4, 5, 6, 7]
// [0, 1, 2, 3, 4, 5, 6, 7, 8]
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// default: 4.5341796875ms
```

所以，执行这段程序共消耗了 `4.5341796875ms` 。

此外，还可以加标签来分别开启、终止计时器。

执行：
```javascript
console.time('total')
console.time('init arr')
var arr = new Array()
console.timeEnd('init arr')
for (var i = 0; i < 10; i++) {
  arr.push(i)
}
console.timeEnd('total')
```

可得到输出：

```javascript
// init arr: 0.005126953125ms
// total: 0.254150390625ms
```

可见，声明 `arr` 消耗了 `0.005126953125ms`，整段程序共消耗 `0.254150390625ms`。

---
`console.assert(expression, object)` ：

在被评估的表达式为 `false` 时向控制台写入一个错误。

```javascript
const greaterThan = (a, b) => {
  console.assert(a === b, {
    assertation: "a equals b",
    a: a,
    b: b,
  })
}

greaterThan(5, 5)
greaterThan("foo", "foo")

greaterThan(5, 6)
greaterThan("foo", "bar")

// Assertion failed: {assertation: "a equals b", a: 5, b: 6}
// Assertion failed: {assertation: "a equals b", a: "foo", b: "bar"}
```

---
`console.group()` 及 `console.groupEnd()` 生成一个 log 组：

`console.error()`：
输出一条类似 `console.log()` 的消息，但同时在记录的消息旁显示一个红色错误图标，并包含一个堆叠追踪。

`console.warn()`：
输出一条类似 `console.log()` 的消息，但同时在记录的消息旁显示一个黄色警告图标，并包含一个堆叠追踪。

```javascript
console.group('log-group')
console.log('This is a [log] in the group.')
console.error('This is a [error] in the group.')
console.warn('This is a [warn] in the group.')
console.groupEnd('log-group')
```
