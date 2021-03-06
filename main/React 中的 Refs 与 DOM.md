React 中的 Refs 与 DOM

React 通过 refs 的方式来访问 DOM 节点或是在 `render()` 方法当中创建的 React 元素。

旧有的 API 当中 `ref` 属性为一个字符串，例如：
```html
<!-- DOM 节点 -->
<div ref="header_component"></div>

<!-- React 组件 -->
<Header ref="header_component"></Header>
```

随后可以通过 `this.refs.header_component` 来访问这个 `div` 或是访问 Header 组件的方法。

但是，这种方法存在一些[问题](https://github.com/facebook/react/pull/8333#issuecomment-271648615)，并可能从将来的版本中移除。因此，推荐使用如下两种方法：

- `React.createRef()` API
- Callback Pattern

## `React.createRef()` API
```javascript
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
    this.focusTextInput = this.focusTextInput.bind(this)
  }

  focusTextInput() {
    // 使用 `current` 来访问 DOM 节点
    this.textInput.current.focus()
  }

  render() {
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />

        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    )
  }
}
```

## Callback Pattern
```javascript
class MyComponent extends React.Component {
  onBackToTopClick = () => this.scrollEl.scrollTop = 0

  render() {
    return (
      <div ref={el => this.scrollEl = el}></div>
    )
  }
}
```

refs 不能应用于没有实例的函数式组件。如果需要使用 `ref` 属性来访问组件，需要像使用生命周期或 state 一样将其转换为 class。 
