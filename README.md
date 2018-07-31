# Cygra's Note

包括如下内容:

- [React](#react)
  - [State & Lifecycle](#state-and-lifecycle)
    - [State](#state)
    - [Lifecycle](#lifecycle)
    - [Scene](#scene)
  - [Redux](#redux)
    - [Object Spread Operator](#object-spread-operator)
    - [Immutable Update Patterns](#immutable-update-patterns)
- [库](#lib)



# ES Features

>## Babel
---

[Babel](https://babeljs.io/)是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。

```javascript
[1, 2, 3].map(n => n ** 2)

=>

"use strict";

[1, 2, 3].map(function (n) {
  return Math.pow(n, 2);
});
```
```javascript
const arr = [1, 2]
const newArr = [...arr, 3]

=>

"use strict";

var arr = [1, 2];
var newArr = [].concat(arr, [3]);
```
```javascript
let foo = {name: 'foo', key: 'k1'}
let bar = {...foo, key: 'k2'}

=>

'use strict';

var _extends = Object.assign ||
function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

var foo = { name: 'foo', key: 'k1' };
var bar = _extends({}, foo, { key: 'k2' });
```


# React

## State and Lifecycle

>### State
---

The constructor is the only place we can use ```this.state``` to initialize the state of a component.

We can then use ```this.setState``` to update the state.

When we call ```this.setState```, React merges the object we provide into the current state, which means that the state can be updated partially.

State updates may be asynchronous, so as to update the state we can use a function ```(prevState, props) => ({...})``` which receives two arguments, the previous state as the first argument, and the props at the time the update is applied as the second.

>### Lifecycle
---

Adding lifecycle methods to a class makes it possible to apply or free up resources taken by the components when they are rendered or destroyed. The two are called  **mounting** and  **unmounting** respectively in React.

We can declare special methods on the component class to run some code when a component mounts and unmounts. These methods are called **lifecycle hooks**.

The ```componentDidMount()``` hook runs some code after the component output has been rendered to the DOM. The code can be a timer based on ```setTimeout()``` ```setInterval()``` or a AJAX request for example.

When the component is removed from the DOM, React calls the ```componentWillUnmount()``` lifecycle hook so the code mentioned is stopped.

The whole procedure can be illustrated as:

1. When ```<Compo />``` is passed to ```ReactDOM.render()```, React calls the constructor of the component. React initializes this.state with an object. We can later update this state.
2. React then calls the component’s ```render()``` method. React then updates the DOM to match the component’s render output.
3. When the component has been rendered in the DOM, React calls the ```componentDidMount()``` lifecycle hook. Inside it, the component asks the browser to run some code.
4. We can use ```this.setState``` to let React know that the state has been updated. React then calls ```render()``` method again to update the DOM.
5. If the Compo component will be removed from DOM, React calls ```componentWillUnmount()``` lifecycle hook so the text changes.

```javascript
class Compo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'React',
    }
  }

  componentDidMount() {
    this.timer = setTimeout(() =>
      this.setState({
        value: 'five seconds later',
      }), 5000)
  }

  componentWillUnmount() {
    this.setState({
      value: 'React',
    })
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.value}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Compo />,
  document.getElementById('root')
);
```
In addition to the two hooks mentioned, the component lifecycle also have some other methods to run code at particular times in the process.

Methods with ```-will-``` are called right **before** something happens.
Methods with ```-did-``` are called right **after** something happens.

- Mounting
When a component is being created and inserted into the DOM:

  - ```constructor()```is called **before the component is mounted**. The constructor is the right place to initialize state.
  - ```componentWillMount()```is called right before mount. ***基本不会使用**
  - ```render()```is always required. It requires ```this.props``` and ```this.state``` and return React Element(JSX) or String and Number or Portals or ```null``` or Booleans.
  - ```componentDidMount()```is called right after mount.

- Updating
When a component is being re-rendered:

  - ```componentWillReceiveProps(nextProps)```is called before a mounted component receives new props.
  - ```shouldComponentUpdate(nextProps, nextState)```is to let React know if a component’s output is not affected by the current change in state or props. If ```shouldComponentUpdate()``` returns false, then ```componentWillUpdate()```, ```render()```, and ```componentDidUpdate()``` will not be invoked.
  - ```componentWillUpdate(nextProps, nextState)```is invoked just before rendering when new props or state are being received. It will not be invoked if ```shouldComponentUpdate()``` returns ```false```.
  - ```render()```
  - ```componentDidUpdate()``` is invoked immediately after updating occurs (except the initial render). It will not be invoked if ```shouldComponentUpdate()``` returns ```false```.

- Unmounting
When a component is being removed from the DOM:

  - ```componentWillUnmount()```is called right before a component is unmounted and destroyed to perform any necessary cleanup such as invalidating a timer.

- Error Handling
When there is an error during rendering, in a lifecycle method, or in the constructor of any child component:

  - ```componentDidCatch(error, info)```catches JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

>### Scene
---

- Set auto-focus for ```<Input />```:

```javascript
<Input autoFocus={true} />
```

```javascript
export default class Input extends Component {
  .
  .

  componentDidMount() {
    if (this.props.autoFocus) {
      this.textInput.focus()
      this.textInput.select()
    }
  }

  .
  .

}

```

- Set src for ```<Cropper />```：

```javascript
class LogoCropper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
    }
  }

  componentDidMount() {
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      const dataURL = e.target.result
      this.setState({
        src: dataURL,
      })
    }

  .
  .

  render(){
    return (
    .
    .
    <Cropper
       src={this.state.src}
       .
       .
    />
    .
    .
  }
}


```
- Update props:

```javascript
componentWillReceiveProps(nextProps) {
  // 更新后重新初始化以及重新求值
  .
  .
}
```
- Remove event listener of a component:

```javascript
class HeadlinesPicker extends Component {
  .
  .
  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick)
  }
  .
  .
}
```
- Stop the ```setInterval``` timer:

```javascript
class NotificationIcon extends Component {
  .
  .
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  .
  .
}
```

## Redux

先来看一段代码：
```javascript
var x = 12
var y = 12

var object = { x: 1, y: 2 }
var object2 = { x: 1, y: 2 }

console.log(object == object2)
// false
console.log(object === object2)
// false
```

可以看出，object和object2的值相同。但是此二者在程序中却不相等。

浅比较（也被称为引用相等）只检查两个不同变量是否为同一对象的引用；与之相反，深比较（也被称为原值相等）必须检查两个对象所有属性的值是否相等。

所以，浅比较就是简单（且快速）的 a === b，而深比较需要以递归的方式遍历两个对象的所有属性，在每一个循环中对比各个属性的值。

因为性能考虑，Redux 使用浅比较。

故此，在React-Redux中我们要使用不可变对象。也就是说，总是去返回一个新的更新后的对象，而不是直接去修改原始的state tree。

如果某个Redux的reducer直接修改并返回了传给它的state对象，根state对象的值的确会改变，但这个对象自身的引用没有变化。React-Redux是通过对根state对象进行浅比较来决定是否要重新渲染包装的组件的。它不会检测到state的变化，也就不会触发重新渲染。

>### Object Spread Operator
---

通过展开运算符```...```，可以将一个对象的可枚举属性拷贝至另一个对象。
```javascript
let foo = {name: 'foo', key: 'k1'}
let bar = {...foo, key: 'k2'}

console.log(foo)
// {name: 'foo', key: 'k1'}
console.log(bar)
// {name: 'foo', key: 'k2'}

console.log(foo == bar)
// false
console.log(foo === bar)
// false

//=================================
let b = {...foo, key: 'k1'}
console.log(b)
// {name: 'foo', key: 'k1'}

console.log(b == foo)
// false
console.log(b === foo)
// false

//=================================
let c = foo
console.log(c)
// {name: "foo", key: "k1"}

c.key = 'k3'
console.log(c)
// {name: "foo", key: "k3"}
console.log(foo)
// {name: "foo", key: "k3"}

console.log(c == foo)
// true
console.log(c === foo)
// true
```

>### Immutable Update Patterns
---
ref:
- [Immutable Update Patterns](https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns)
- [
Immutable Javascript using ES6 and beyond](https://wecodetheweb.com/2016/02/12/immutable-javascript-using-es6-and-beyond/)

不可变的基本更新操作，例如更新一个对象中一个字段:
```javascript
let foo = {name: 'foo', key: 'k1'}
let bar = {...foo, key: 'k2'}
```
或者在数组的末尾增加一个数据:
```javascript
const arr = [1, 2]
const newArr = [...arr, 3]
```

此外：
- #### 更新嵌套的对象
更新嵌套数据的关键是必须适当地复制和更新嵌套的每个级别:
```javascript
updateVeryNestedField = (state, action) => {
  return {
    ....state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
        ...state.first.second[action.someId],
          fourth: action.someValue,
        }
      }
    }
  }
}
```
因此要尽可能保持状态扁平（flattened），并且尽可能多地构建[reducer](https://redux.js.org/basics/reducers)。

- #### 在数组中插入和删除数据
避免使用```push```，```unshift```，```shift```，从而避免在reducer 中直接修改状态。“插入”和“删除”的行为如下所示：
```javascript
insertItem = (array, action) => {
  return [
    ...array.slice(0, action.index),
    action.item,
    ...array.slice(action.index),
  ]
}

removeItem = (array, action) => {
  return [
    ...array.slice(0, action.index),
    ...array.slice(action.index + 1),
  ]
}
```
- #### 在一个数组中更新一个项目
更新数组的一项可以使用```Array.map```, 返回我们想要更新那项的一个新值，和其他项原来的值：
```javascript
updateObjectInArray = (array, action) => {
  return array.map( (item, index) => {
    // 保持原来的值
    index !== action.index && return item

    // 返回更新的值
    return {
      ...item,
      ...action.item,
    }
  })
}
```

# lib
>## [JavaScript Style Guide](https://github.com/standard/standard)
---
The most IMPORTANT.

>## [react-redux](https://github.com/reduxjs/react-redux)
---
Official React bindings for [Redux](https://github.com/reduxjs/redux).

>## [redux-saga](https://github.com/redux-saga/redux-saga)
---
```redux-saga``` is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

>## [jquery-color](https://github.com/jquery/jquery-color)
---
一个jQuery扩展库，可以实现对网页的色彩控制，如：
```javascript
  $('#foo').animate({
    backgroundColor: 'rgb(249,204,226)',
  }, 2200);
```

>## [ant-design](https://github.com/ant-design/ant-design)
---
方便易用的UI组件库。

>## [zepto](https://github.com/madrobby/zepto)
---
轻量级的JS库。

>## [lodash](https://github.com/lodash/lodash)
---
提供了大量的方便的工具。
例如可以用来防抖动的[```debounce（）```](https://github.com/lodash/lodash/blob/master/debounce.js)：
```javascript
debounceFetchData = debounce(this.props.fetchData, 200, {
  leading: false,
  trailing: true,
  maxWait: 200,
})
```
例如获取数组中除最后一个元素外其余元素的[```initial()```](https://github.com/lodash/lodash/blob/master/initial.js)，其源码：
```javascript
function initial(array) {
  const length = array == null ? 0 : array.length
  return length ? slice(array, 0, -1) : []
}
```
and：[You-Dont-Need-Lodash-Underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore)

>## [datepicker](https://github.com/fengyuanchen/datepicker)
---
A simple jQuery datepicker plugin.

>## [qrious](https://github.com/neocotic/qrious)
---
Pure JavaScript library for QR code generation using canvas.
```javascript
var qr = new QRious({
  element: document.getElementById('qr'),
  value: qrUrl,
  size: 160,
  level: 'M',
})
```

>## [moment](https://github.com/neocotic/qrious)
---
A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
```javascript
let initDate = moment().subtract(6, 'quarters').startOf('quarter')
```

>## [js-cookie](https://github.com/js-cookie/js-cookie)
---
A simple, lightweight JavaScript API for handling browser cookies.
