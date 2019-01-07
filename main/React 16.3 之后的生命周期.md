React 16.3 引入了一些新的生命周期函数，并将一些既有的生命周期函数标为 `UNSAFE_`。

被列为不安全的有：

- `UNSAFE_componentWillMount()`
- `UNSAFE_componentWillReceiveProps()`
- `UNSAFE_componentWillUpdate()`


此外，引入了两个新的生命周期：

- [`static getDerivedStateFromProps(props, state)`](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
- [`getSnapshotBeforeUpdate(prevProps, prevState)`](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)

`getDerivedStateFromProps()` 在每一次 `render()`方法之前被调用，包括组件初始化加载和之后的更新。它主要针对 `state` 的更新完全依赖于 `props` 的情况。
这个方法不能访问组件实例`this`，而是返回一个对象来更新 `state`，或者在不更新的时候返回一个 `null`。

`getSnapshotBeforeUpdate()` 在最近一次 DOM 更新之前被调用。它使组件可以在 DOM 可能被更新之前获取 DOM 的一些信息（例如：滚动位置）。这一生命周期返回的任何值都将被作为参数传递给 `componentDidUpdate()`。
