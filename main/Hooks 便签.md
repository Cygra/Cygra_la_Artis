### `useState`

```javascript
const [count, setCount] = useState(0);
```

`useState` returns a pair: the current state value and a function that lets you update it.
The only argument to `useState` is the initial state.

### `useEffect`

```javascript
useEffect(() => {
  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
```

It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in React classes, but unified into a single API.

```javascript
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```

Now the subscription will only be recreated when props.source changes.

### `useContext`

```javascript
const value = useContext(MyContext);
```

Accepts a context object (the value returned from React.createContext) and returns the current context value for that context.

### `useReducer`

```javascript
function init(initialCount) {
  return { count: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

const [state, dispatch] = useReducer(reducer, initialCount, init);

<div>Count: {state.count}</div>
<button onClick={() => dispatch({type: 'reset', payload: initialCount})}>
  Reset
</button>
```

### `useCallback`

### `useMemo`

### `useRef`

### `useImperativeHandle`

### `useLayoutEffect`

### `useDebugValue`
