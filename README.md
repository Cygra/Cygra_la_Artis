# ES-Features

包括如下内容:
- [Babel](#babel)
- [```var``` vs ```let``` vs ```const```](#var-vs-let-vs-const)
- [```function``` vs ```class```](#function-vs-class)
- [```export``` vs ```import```](#export-vs-import)
- [Arrow Function](#arrow-function)
- [Destructuring](#destructuring)
- [```for..of```](#for..of)
- [Template Literals](#template-literals)
- [Rest vs Spread](#rest-vs-spread)

---
>### Babel
Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。

```javascript
[1, 2, 3].map(n => n ** 2)

=>

[1, 2, 3].map(function (n) {
  console.log(n + 1)
})

```

---
>### ```var``` vs ```let``` vs ```const```
```let```的用法类似于```var```，但是所声明的变量只在```let```命令所在的代码块内有效。

```javascript
for (let i = 0 i < 10 i++) {
  ...
}
```
```let```不存在变量提升，它所声明的变量一定要在声明后使用，否则报错。

```javascript
console.log(foo) // undefined
var foo = 2

console.log(bar) // ReferenceError
let bar = 2
```
存在```let```的块级作用域，它所声明的变量不再受外部的影响，亦即暂时性死区。

```javascript
var tmp = 123

if (true) {
  tmp = 'abc' // ReferenceError
  let tmp
}
```
```let```不允许重复声明。

```javascript
function func() {
  let a = 10
  var a = 1
} // undefined

function func() {
  let a = 10
  let a = 1
} // undefined
```

```const```声明一个只读的常量。一旦声明就不能修改。因为不得修改，所以必须立即初始化。

```javascript
const a = 1
a = 2 // Uncaught TypeError: Assignment to constant variable.

const b // Uncaught SyntaxError: Missing initializer in const declaration
```
```const```存在暂时性死区，不允许重复声明。
```javascript
const a = [1,2,3]
a.push(4)
a // [1, 2, 3, 4]
a.length // 4
a = 2 // Uncaught TypeError: Assignment to constant variable.
```

---
>### ```function``` vs ```class```

生成实例对象的传统方法是通过构造函数```funciton```。

```javascript
function Point(x, y) {
  this.x = x
  this.y = y
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')'
}

var p = new Point(1, 2)
```
ES6引入了```class```。

```javascript
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')'
  }
  
  foo() {
  }
}

var p = new Point(1, 2)
```
```javascript
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y) //继承父类的x, y
    this.color = color
  }
  
  toString() {
    return this.color + ' ' + super.toString() // 调用父类的toString()
  }
  
  bar() {
    super.foo()
  }
}
```

```class```通过```extends```实现继承。
子类必须在```constructor```中调用```super```方法，从而继承父类的```this```对象。子类还可以使用```super	```来新建父类的```this```对象。  

子类的构建是基于对父类的修改加工，只有使用```super```方法才能返回父类。而ES5的继承是先创造子类的实例对象```this```，然后再将父类的方法添加到```this```上面。  

```super```作为函数时，虽然代表了父类```Point```的构造函数，但是返回的是子类```ColorPoint```。即，```super```的```this```指向```ColorPoint```，相当于```Ponit.prototype.constructor.call(this)```。  

```super```作为对象时，```super.foo()```调用父类```Ponit.prototype.foo()```，但是内部的```this```指向子类```ColorPoint```。  

使用```super```的时候，必须显式指定是作为函数还是对象使用，否则解析代码时会混淆```super```所代表的含义，报错。

---
>### ```export``` vs ```import```
ES6实现了模块功能，通过```export```命令输出代码，通过```import```命令输入代码，从而将一个大程序拆分成互相依赖的小文件。  
> Ruby: ```require 'nokogiri'```  
> Python: ```import module_1```  
> CSS: ```@import url("global.css")```  

使用```export```输出，可使外部读取模块内部的变量、函数或类。  
使用```as```可对输出的变量、函数、类重命名。 
使用```export default```可以指定模块的默认输出。  
```export```可以出现在模块顶层的任何位置。因为```export```命令是编译阶段静态执行的，在代码运行之前，所以具有提升效果。  
```const```声明的常量也可输出。  

```javascript
sample.js

export function func() {
  ..
}
```
```javascript
constants.js

export const A = 1
export const B = 2
export const C = 3
```
使用```import```命令加载其它模块的部分或整个模块。  
使用```as```可对输入的变量、函数、类重命名。   
```import```可以出现在模块顶层的任何位置。因为```import```命令是编译阶段静态执行的，在代码运行之前，所以具有提升效果。  
```import```输入的变量是只读的。

```javascript
main.js

import {func, ..} from './sample.js'
//or
import from './sample.js'
```

```import()```函数可以按需、条件、动态加载。

```javascript
if (condition) {
  import('moduleA').then(...)
} else {
  import('moduleB').then(...)
}
```


在```<script>```标签中使用```type="module"```可以实现浏览器的异步加载。

```
<script type="module" src="./foo.js"></script>
```

---
>### Arrow Function

箭头函数比函数表达式更短，并且不绑定自己的```this```，```arguments```，```super```或```new.target```。箭头函数不能用作构造函数，适合用于非方法函数。

基本语法：

```javascript
// 有参数的函数
let f = (参数1, 参数2, .., 参数n) => { 函数声明 }

// 没有参数的函数写成一对圆括号
let f = () => { 函数声明 }
```

函数表达式更短。

```javascript
var materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
]

//ES5
materials.map(function(material) { 
  console.log(material.length)
}) // [8, 6, 7, 9]


//Arrow Function
materials.map((material) => {
  console.log(material.length)
}) // [8, 6, 7, 9]

// Arrow Function
materials.map(material => material.length)
```
箭头函数不会创建自己的```this```，而是使用封闭执行上下文的```this```。

```javascript
function Person(){
  this.age = 0

  setInterval(() => {
    this.age++ // |this| 指向Person 对象
  }, 1000)
}

var p = new Person()
```

不能用做构造函数。

```javascript
var Foo = () => {}
var foo = new Foo() // TypeError: Foo is not a constructor
```

参数和箭头之间不能换行。

```javascript
var func = ()
           => 1
// SyntaxError: expected expression, got '=>'
```

箭头函数具有不同的解析优先级。

```javascript
let callback

callback = callback || function() {} // ok

callback = callback || () => {}     
// SyntaxError: invalid arrow-function arguments

callback = callback || (() => {}) // ok
```

```Promise```异步对象链。

```javascript
promise.then(a => {
  // ...
}).then(b => {
  // ...
})
```

闭包。

```javascript
var Add = (i=0) => { () => (++i) }
var a = Add()

a() // 1
a() // 2
```

---
>### Destructuring

将『值』从『数组』
```javascript
var a, b

[a, b] = [1, 2]
console.log(a) // 1
console.log(b) // 2
```
```javascript
function f() {
  return [1, 2, 3]
}

var [a, , b] = f()
console.log(a) // 1
console.log(b) // 3
```
```javascript
var [a, ...b] = [1, 2, 3]
console.log(a) // 1
console.log(b) // [2, 3]
```
或 『属性』从『对象』
```javascript
var o = {p: 42, q: true}
var {p: foo, q: bar} = o
 
console.log(foo) // 42 
console.log(bar) // true
```
```javascript
var {a = 10, b = 5} = {a: 3}

console.log(a) // 3
console.log(b) // 5
```
```javascript
function Chart({size = 'big', cords = { x: 0, y: 0 }, radius = 25} = {}) 
{
  console.log(size, cords, radius)
}

Chart({
  cords: { x: 18, y: 30 },
  radius: 30
})
```
```javascript
var people = [
  {
    name: "Mike Smith",
    family: {
      mother: "Jane Smith",
      father: "Harry Smith",
      sister: "Samantha Smith"
    },
    age: 35
  },
  {
    name: "Tom Jones",
    family: {
      mother: "Norah Jones",
      father: "Richard Jones",
      brother: "Howard Jones"
    },
    age: 25
  }
]

for (var {name: n, family: { father: f } } of people) {
  console.log("Name: " + n + ", Father: " + f)
}

// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"
```
提取到不同的变量中。

---
>### ```for..of```
```for..of```语句在可迭代对象（```Array```，```Map```，```Set```，```String```，```arguments对象```等）上创建一个迭代循环。

```javascript
let iterable = [1, 2, 3]

for (const value of iterable) {
    console.log(value)
}
// 1
// 2
// 3
```
```javascript
let iterable = "boo"

for (let value of iterable) {
  console.log(value)
}
// "b"
// "o"
// "o"
```
```javascript
(function() {
  for (let argument of arguments) {
    console.log(argument)
  }
})(1, 2, 3)

// 1
// 2
// 3
```
```javascript
//迭代DOM集合
let articleParagraphs = document.querySelectorAll("article > p")

for (let paragraph of articleParagraphs) {
  paragraph.classList.add("read")
}
```

---
>### Template Literals
```javascript
`string text ${expression} string text`
```
```javascript
var person = 'Mike'
var age = 28

function myTag(strings, personExp, ageExp) {

  var str0 = strings[0]
  var str1 = strings[1]

  var ageStr
  if (ageExp > 60){
    ageStr = 'old person'
  } else {
    ageStr = 'young person'
  }

  return str0 + personExp + str1 + ageStr

}

var output = myTag`that ${ person } is a ${ age }`

console.log(output)    // that Mike is a young person
```

---
>### Rest vs Spread
剩余：
```javascript
function func(...theArgs) {
  console.log(theArgs.length)
}

func(5, 6, 7) // 3
```
```javascript
function f(z, ...[a,b,c]) {
    console.log(a + b + c)
}
undefined
f(1, 2, 3, 4) // 9
// z对应第一个参数
```
```javascript
function f(...[a, b, c]) {
  console.log(a + b + c)
}

f(1, 2, 3)    // 6
f(1)          // NaN 
//b、c尚未定义
f(1, 2, 3, 4) // 6 
// 4未被解构
```
传播：
```javascript
// 传递参数
function sum(x, y, z) {
  console.log(x + y + z)
}

sum(...[1, 2, 3]) // 6
```
```javascript
// 用于数组
var arr = [1, 2, 3]
var arr2 = [...arr]
arr2.push(4) 
arr2 // [1, 2, 3, 4]
```
```javascript
// 用于对象
var obj1 = { foo: 'bar', x: 42 }
var obj2 = { foo: 'baz', y: 13 }

var mergedObj = { ...obj1, ...obj2 }
// { foo: "baz", x: 42, y: 13 }
```