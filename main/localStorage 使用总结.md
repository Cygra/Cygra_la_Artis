localStorage 使用总结

### localStorage 的优点

- 突破了 cookies 的大小限制（[RFC 2109 6.3  Implementation Limits](https://www.ietf.org/rfc/rfc2109.txt)）；
- 可以永久保存；

### localStorage 的缺点
- 潜在的浏览器支持[问题](https://caniuse.com/#search=localstorage)；
- 在无痕 / 隐私模式下不可读取；
- 只能存储字符串；

### localStorage 的使用方法

首先，可以使用类似语句判断当前浏览器对 localStorage 的支持性：
```javascript
if (window.localStorage) {
  console.log("浏览器支持 localStorage!")
} else {
  // 。。。
}
```

在浏览器支持 localStorage 的情况下，对 localStorage 的使用主要涉及到以下四个方法：

- `localStorage.setItem(key, value)`
- `localStorage.getItme(key)`
- `localStorage.key(index)`
- `localStorage.clear()`

```javascript
const value = JSON.stringify({name: 'Cygra', location: 'SH'})
const key = 'myStorage'

localStorage.setItem(key, value)

const myStorage = JSON.parse(localStorage.getItem(key))
console.log(myStorage)
// {name: "Cygra", location: "SH"}

localStorage.key(0)           // 取 localStorage 中的第一（0）个
localStorage.removeItem(key)  // 清除指定
localStorage.clear()          // 清除所有
```
