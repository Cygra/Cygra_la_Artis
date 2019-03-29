virtual dom 的原理

常思考

什么是作用域链

什么是继承

react 里 key 的用处

移动和PC的区别    toB 和 toC 的区别

__proto__ 和 prototype https://github.com/mqyqingfeng/Blog/issues/

V8 源码 

React 源码

fiber https://github.com/acdlite/react-fiber-architecture

We've established that a primary goal of Fiber is to enable React to take advantage of scheduling. Specifically, we need to be able to

- pause work and come back to it later.
- assign priority to different types of work.
- reuse previously completed work.
- abort work if it's no longer needed.

In order to do any of this, we first need a way to break work down into units. In one sense, that's what a fiber is. A fiber represents a unit of work.

Reconciliation 简要
- 元素类型改变的（Elements Of Different Types），完全重新渲染
- 类型没有改变的（DOM Elements Of The Same Type），逐一比较属性
- 列表使用 key

key：稳定、可预测、唯一。（stable, predictable, and unique.）

The DOM is just one of the rendering environments React can render to, the other major targets being native iOS and Android views via React Native. (This is why "virtual DOM" is a bit of a misnomer.)

The reason it can support so many targets is because React is designed so that reconciliation and rendering are separate phases. The reconciler does the work of computing which parts of a tree have changed; the renderer then uses that information to actually update the rendered app.

This separation means that React DOM and React Native can use their own renderers while sharing the same reconciler, provided by React core.

Fiber reimplements the reconciler. It is not principally concerned with rendering, though renderers will need to change to support (and take advantage of) the new architecture.

受控组件和非受控组件 https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/

https://github.com/semlinker/reactjs-interview-questions
