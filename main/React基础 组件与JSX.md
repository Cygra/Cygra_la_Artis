>## React Component
---

有三种方式可以定义一个 React 组件，分别为：
- ```React.createClass```：
```javascript
const Comp = React.createClass({
  render() {
    return(
      <p>I am a component!</p>
    )
  }
})
```

- ```class```：
```javascript
class Comp extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
      ...
    }

    render() {
      return (
        <p>I am a component!</p>
      )
    }
  }
}
```

- ```Stateless Functional Component```：
```javascript
function Comp(props) {
  return (
    <div onClick={handleClick}>${props.name}</div>
  )
}
```
> TODO：三种方式的区别

>## [JSX](#https://doc.react-china.org/docs/introducing-jsx.html)
---

JSX 是一种 JavaScript 的语法扩展。

在 React 中推荐使用 JSX 来描述用户界面。

可以在 JSX 中使用 JavaScript 表达式。使用时需将表达式包含在大括号```{}```里。

在 JSX 当中应使用```camelCase```小驼峰命名来定义属性，如```tabIndex```、```onChange```、```onClick```等，且注意类名```class```应为```className```，因为```class```为JavaScript的保留字之一。

可在属性中直接定义相应DOM的样式。例如：
```javascript
<Comp
  className="comp-container"
  style={{
    border: '1px solid black',
    borderRadius: '4px',
  }}
/>
```
，注意```borderRadius```。

Babel 转译器会把 JSX 转换成一个名为```React.createElement()```的方法调用。在编译之后，JSX 将被转化成为普通的 JavaScript 对象。因此，可以在```if```或```for```等语句中使用 JSX ，例如赋值、传参、返回等。

例如，
```javascript
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>
  }
  return <h1>Hello, Stranger.</h1>
}
```
会被Babel转译成：
```javascript
"use strict";

function getGreeting(user) {
  if (user) {
    return React.createElement(
      "h1",
      null,
      "Hello, ",
      formatName(user),
      "!"
    );
  }
  return React.createElement(
    "h1",
    null,
    "Hello, Stranger."
  );
}
```
。

JSX 代码一般应包含在圆括号```()```当中，参见[JavaScript's automatic semicolon insertion (ASI)](#https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)。

可将数组映射为 JSX 元素列表：
```
<ul>
{dataList.map((data, index) => {
  return(
    <li key={index} className="list-item">
      {data.title}
    </li>
  )
})}
</ul>
```
。

可以使用[```Spread Attributes```](#https://gist.github.com/sebmarkbage/07bbe37bc42b6d4aef81)来扩充组件的属性。

例如，
```javascript
const attrs = {
  className: "comp-container",
  foo: "bar",
}
<Comp {...attrs}>
  Hello World!
</Comp>
```
等同于
```javascript
const attrs = {
  className: "comp-container",
  foo: "bar",
}
<Comp
  className={attrs.className}
  foo={attrs.foo}
>
  Hello World!
</Comp>
```
。
