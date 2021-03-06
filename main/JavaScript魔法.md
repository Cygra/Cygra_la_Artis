```javascript
[[[5]]].toString()
// "5"
```
---
调用数组的 `toString()` 方法会返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串。

```javascript
var a = 1

function foo() {
  var a = 2
  alert (a)
}

function bar() {
  alert(a)
}

foo()
// 2
bar()
// 1
alert(a)
// 1
```
---
当代码在一个环境中执行时，会创建变量对象的一个**作用域链**。

标识符的解析是沿着作用域链一级一级地搜索标识符的过程。搜索过程始终从作用链的前端开始，然后逐级地向后回溯，直到找到表示符为止（如果找不到标识符则通常会发生错误）。

函数 `foo()` 及 `bar()` 的作用域链分别包含两个对象：它们各自的变量对象和全局环境的变量对象。

因此，以上代码共涉及三个执行环境：全局环境，`foo()`的局部环境和`bar()`的局部环境。
- 全局环境中有一个变量 `a` 和两个函数 `foo()` 及 `bar()` ；
- `foo()` 的局部环境中有一个局部变量 `a()` ，也可以访问到全局环境中的变量 `a` （这个变量只能在这个环境中访问到）；
- `bar()` 可以访问到全局变量 `a` ;

内部环境可以通过作用域链访问所有的外部环境，但外部环境不能访问内部环境中的任何变量和函数。

> 函数也被当做变量来对待，因此其访问规则与执行环境中的其他变量相同。

```javascript
typeof typeof 666
// "string"
```
---
`typeof` 是返回给定变量的数据类型的操作符。返回的结果是字符串。

`typeof`可能的返回结果有：
- `undefined` ：未定义
- `boolean` ：布尔值
- `string` ：字符串
- `number` ：数字（包括 `NaN` ）
- `object` ：对象或 `null` （ `null` 被认为是一个空的对象引用）
- `function` ：函数

```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(new Date, i)
    }, 1000);
}

console.log(new Date, i)

// Wed Aug 08 2018 21:32:56 GMT+0800 (CST) 5
// Wed Aug 08 2018 21:32:57 GMT+0800 (CST) 5
// Wed Aug 08 2018 21:32:57 GMT+0800 (CST) 5
// Wed Aug 08 2018 21:32:57 GMT+0800 (CST) 5
// Wed Aug 08 2018 21:32:57 GMT+0800 (CST) 5
// Wed Aug 08 2018 21:32:57 GMT+0800 (CST) 5
```
---
输出结果可以简单地描述为：

立即输出一个5（ `i` ），一秒后输出5（ `i` ）个5（ `i` ）。

事实上，如上代码的执行过程为：

在循环的执行过程中，几乎同时地设定了5个在1秒后触发的定时器，循环完后立即输出 `i`。

1秒后，执行了定时器内的`console.log(new Date, i)`，此时i早已变成了5，因此输出5个5。

那么，如何能输出5个5呢？

直观的思路是，让定时器在被设定的时候就拿到 `i`，而不是在执行的时候才拿到 `i`。

一种想法是，包在一层函数里，把 `i` 复制下来通过函数传递过去来设置定时器，如：

```javascript
let puts = (j) => {
  setTimeout(() => {
    console.log(new Date, j)
  }, 1000)
}

for (var i = 0; i < 5; i++) {
  puts(i)
}

console.log(new Date, i)
```

随随手习惯性地就写出了 `let` 和箭头函数，事实上，`let` 因为限定了变量的作用域，因此，也可以很好地回答这一问题：

```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(new Date, i)
  }, 1000);
}

console.log(new Date, i)
```

但也同时因为块级作用域的问题，循环外的 `log` 会输出 `Uncaught ReferenceError: i is not defined` 。

另外，将上边最后这一段使用 `let` 的代码经Babel编译得到：

```javascript
"use strict";

var _loop = function _loop(_i) {
    setTimeout(function () {
        console.log(new Date(), _i);
    }, 1000);
};

for (var _i = 0; _i < 5; _i++) {
    _loop(_i);
}

console.log(new Date(), i);
```

哎呀，殊途同归殊途同归...

---
给出数字 `i`, 输出 `[0, 1, 2, 3, ...i]` 。

```javascript
var func = i => [...Array(i + 1).keys()]

func(10)
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

---
```javascript
var a
typeof a
// "undefined"

let b
typeof b
// "undefined"

const c
// Uncaught SyntaxError: Missing initializer in const declaration
```

---
定义一个函数 `f`：
```javascript
f(1)(2)() // 3
f(1)(4)(6)() // 11
```

```javascript
const f = a => {
  if (a === undefined) {
    return 0
  } else {
    return b => {
      if (b === undefined) {
        return a
      } else {
        return f(a + b)
      }
    }
  }
}
```

or 

```javascript
const f = a => a === undefined ? 0 : b => b === undefined ? a : f(a + b)
```

---
寻找最长的数组的方法。
https://stackoverflow.com/questions/33577266/how-to-find-longest-array-in-an-array-of-arrays-in-javascript

```javascript
var longestIndex = arr => arr.reduce(
      (prev, current, index, arr) =>
        arr[prev].length > current.length ? prev : index,
      0
    )
    
var target = [ 
    [1,2,3,4,5],
    [1,2], 
    [1,1,1,1,2,2,2,2,4,4],
    [1,2,3,4,5],
  ];

longestIndex(masterArray) // 2
```

---

```javascript
for(i=9,a='';++i<36;)a+=i.toString(36)
// "abcdefghijklmnopqrstuvwxyz"
```

```javascript
[...Array(26)].map(_=>(++i).toString(36).toUpperCase(),i=9).join``
// "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
```

```javascript
String.fromCharCode(...Array(123).keys()).slice(97)
// "abcdefghijklmnopqrstuvwxyz"
```

```ruby
# ruby version
(10...36).map{ |i| i.to_s 36}.join()
# or
('a'..'z').to_a.join()

->
"abcdefghijklmnopqrstuvwxyz"
```

---

```javascript
const nestedArr = [1, 2, [3, 4, [5, 6]]];
const flatten = arr => 
  arr.reduce(
    (flat, next) => flat.concat(Array.isArray(next) ? flatten(next) : next),
    []
  );
```

把数组打平

---

```javascript
var i;

for (i = 0; i < 10; i++) { 
  setTimeout(() => console.log(i), 1000); 
}
// 10
// 10
// 10
// 10
// 10
// 10
// 10
// 10
// 10
// 10
```
```javascript
var i;

for (i = 0; i < 10; i++) {
  (i => setTimeout(() => console.log(i), 1000))(i); 
} 
// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
```

排序 & 不区分大小写

---

```javascript
["Foo", "bar"].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
```

---

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  return "hello, I am " + this.name;
};

var kevin = new Person("Kevin");

kevin.__proto__.sayHello();
// "hello, I am undefined"

kevin.sayHello();
// "hello, I am Kevin"

kevin.constructor === Person
// true

kevin.constructor === Person.prototype.constructor
// true
```
