- [State & Lifecycle](#state-and-lifecycle)
  - [State](#state)
  - [Lifecycle](#lifecycle)
  - [Scene](#scene)
- [Redux](#redux)
  - [Object Spread Operator](#object-spread-operator)
  - [Immutable Update Patterns](#immutable-update-patterns)


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


---
以下生命周期方法标记为“遗留（legacy）”。 它们仍然有效，但不建议在新代码中使用它们。

> [```UNSAFE_componentWillMount()```](https://reactjs.org/docs/react-component.html#unsafe_componentwillmount)

> [```UNSAFE_componentWillReceiveProps(nextProps)```](https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops)

> [```UNSAFE_componentWillUpdate(nextProps, nextState)```](https://reactjs.org/docs/react-component.html#unsafe_componentwillupdate)

与此同时，推荐使用[```
componentDidUpdatecomponentDidUpdate(prevProps, prevState, snapshot)```](https://reactjs.org/docs/react-component.html#componentdidupdate)作为替代。

这一生命周期接收三个参数：更新之前的 `props` 、 `state` 以及一个[`snapshot`](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)。更新后的`props`及 `state` 可用 `this.props.xxx` 及 `this.state.xxx` 获取。

组件发生更新后会立即调用 `componentDidUpdate()` 。而初始渲染不会调用此方法。

可以将此作为在更新组件时对DOM进行操作的机会。只要您将当前的props与之前的props进行比较（例如，如果props没有发生变化，则可能不需要网络请求），则这进行网络请求的好地方。

一种典型用法：
```javascript
componentDidUpdate（prevProps）{
  if（this.props.userID！== prevProps.userID）{ //重要
    this.fetchData（this.props.userID)
  }
}
```

可以在 `componentDidUpdate()` 中立即调用 `setState()` ，但请注意，它必须包含在上述示例中的条件中，否则将导致无限循环，发生溢出。

它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。如果你试图将一些状态“镜像”到来自上方的道具，请考虑直接使用道具。阅读更多关于为什么将道具复制到状态导致错误的原因

如果组件实现了 [`getSnapshotBeforeUpdate()`](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate) 生命周期（很少见），则它返回的值将作为第三个“snapshot”参数传递给 `componentDidUpdate()` 。否则此参数将是未定义的。

> 如果 `shouldComponentUpdate()` 返回false，则不会调用 `componentDidUpdate()`。