React 当中的 Render Props

### 概述

Render Props 是指 React 当中一种通过使用值为函数的属性来实现在组件之间共享代码（复用组件）的方法。这种方法可以替代高阶组件[（🐦）](https://twitter.com/mjackson/status/885910701520207872)。

具有 render prop 的组件接收一个函数，返回一个 React 元素，而不是执行其自身的渲染逻辑。

```javascript
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```

[**Use a Render Prop!**](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)

[**Michael Jackson - Never Write Another HoC**](https://youtu.be/BcVAq3YFiuc)   👈 一个不该错过的精彩视频

### 一个 🌰

组件是 React 当中的最初级的复用单位。但是，当一个组件封装出另一个需要相同的 state 的组件时，使这两个组件共享相同的 state 或行为并不容易。

例如，如下这个组件追踪鼠标指针的位置：

```javascript
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 }
  }

  handleMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    })
  }

  render() {
    const { x, y } = this.state
    return (
      <div 
        style={{ height: '100%' }} 
        onMouseMove={this.handleMouseMove}
      >
        <h1>Move the mouse around!</h1>
        <p>The current mouse position is ({x}, {y})</p>
      </div>
    )
  }
}
```

当鼠标指针移动时，这个组件会把指针的坐标显示在 `<p>` 标签里。

当考虑到复用的问题的时候，问题来了：如果另外一个组件也需要获取指针坐标，我们是否可以将如上行为封装从而在新组件当中复用？

前边已经说过，组件是 React 当中的最初级的复用单位。我们先尝试重构一下代码，使用一个 `<Mouse>` 组件来封装我们要复用的获取指针坐标的行为：

```javascript
class Mouse extends React.Component {
  constructor(props) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 }
  }

  handleMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    })
  }

  render() {
    const { x, y } = this.state
    return (
      <div 
        style={{ height: '100%' }} 
        onMouseMove={this.handleMouseMove}
      >
        {/* 但是我们如何渲染除 `<p>` 以外的内容？ */}
        <p>The current mouse position is ({x}, {y})</p>
      </div>
    )
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse />
      </div>
    )
  }
}
```

这个 `<Mouse>` 组件并不能完全复用。例如，当我们有一个 `<Cat>` 组件，渲染一幅追逐鼠标轨迹的 🐱 的图片，我们可能需要 `<Cat mouse={{ x, y }}>` 来将指针坐标传递给这个组件：

```javascript
class Cat extends React.Component {
  render() {
    const { mouse } = this.props
    const { x, y } = mouse
    return (
      <img 
        src="/cat.jpg" 
        style={{ 
          position: 'absolute', 
          left: x, 
          top: y,
        }} 
      />
    )
  }
}

class MouseWithCat extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 }
  }

  handleMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    })
  }

  render() {
    return (
      <div 
        style={{ height: '100%' }} 
        onMouseMove={this.handleMouseMove}
      >
        {/*
          当我们要 🐶 来追逐鼠标指针的时候我们又需要一个 `<MouseWithDog>`，
          因此 `<MouseWithCat>` 并不能完全复用。
        */}
        <Cat mouse={this.state} />
      </div>
    )
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <MouseWithCat />
      </div>
    )
  }
}
```

Render Props 的作用此刻显现出来：给 `<Mouse>` 提供一个函数属性，动态地决定该渲染什么样的内容，亦即一个 render prop。

```javascript
class Cat extends React.Component {
  render() {
    const { mouse } = this.props
    const { x, y } = mouse
    return (
      <img 
        src="/cat.jpg" 
        style={{ 
          position: 'absolute', 
          left: x, 
          top: y,
        }} 
      />
    )
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 }
  }

  handleMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    })
  }

  render() {
    return (
      <div 
        style={{ height: '100%' }} 
        onMouseMove={this.handleMouseMove}
      >
        {this.props.render(this.state)}
      </div>
    )
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={m => <Cat mouse={m} />} />
      </div>
    )
  }
}
```

简单来说，render prop 就是一个让组件知道应该渲染什么的函数。上例中，`<Mouse>` 接收一个 render prop 函数并将 `this.state` 作为参数传递给这个函数，这个函数接收这个个参数并返回 `<Cat>` 且将这个参数作为 `props` 传递给 🐱 组件。当需要复用时，返回一个 🐶 组件即可（`<Mouse render={m => <Dog mouse={m} />} />`）。

🌟 render prop 并不一定要叫 render，这仅仅是因为这个属性与 render 直接相关。事实上，叫啥都行，只要是让组件知道应该怎么渲染的函数，都是 render prop 。

⚠️ 在 React.PureComponent 当中使用 Render Props

对属性的浅比较对于新的属性总是返回 `false`，因此在这种情况下的每一个 `render` 都会给 render prop 生成一个新的值，而这正好抵消了 `React.PureComponent` 的作用效果。

一种解决办法是将这个 render prop 定义为一个实例方法：

```javascript
class MouseTracker extends React.Component {
  renderTheCat = m => <Cat mouse={m} />

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    )
  }
}
```
