如何写出更优雅的 JavaScript 代码

代码不仅仅是完成从 A 到 B ，代码的可读性、代码执行的性能、代码的可维护性等等，都对代码的整体质量产生影响。而且，将多行代码或复杂结构写成一行代码或简单结构也是我一直追求的目标。

因此，在此整理一些我在日常开发当中探索出的或在其他大牛写的代码当中看到的优雅的实现方式。

---
### 使用 `Array.includes()` 代替多重`或`判断

```javascript
if (str === 'foo' || str === 'bar') {
  console.log(str)
} else ...
```

两个还勉强，假使有好多个的话这种写法显然就不大灵光了。

```javascript
if (['foo', 'bar'].includes(str)) {
  console.log(str)
} else ...
```

---
### 使用 `Array.find()` 
前几天在项目的老代码里加需求的时候，在一个 React 组件里一眼看到了这样一段代码：

```javascript
// 根据 appId 拿到当前 application
getApplicationByAppId() {
  let { appId, talentsViewInfo } = this.props
  let { applications } = talentsViewInfo
  let currentApp = null
  applications.map(app => {
    if (app.id === appId) {
      currentApp = app
    }
  })
  return (currentApp)
}
```
先 `let` 了一个 `currentApp`，然后去数组里找到 `id` 等于当前属性传进来的 `appId` 的那个 `application`，然后赋值给 `currentApp`。

用自然语言捋一下就清楚了，是去数组里*找*一个 `application`，自然是用`Array.find()` 呀。而且，先声明成 `null`，后边再赋值的写法也不大好。之后不会再次赋值的变量，其声明和赋值分开会降低后期维护时代码的可读性。此外，常量用 `const` 语义清晰，对性能也有提升。因此，较为优雅的代码：

```javascript
// 根据 appId 拿到当前 application
getApplicationByAppId() {
  const { appId, talentsViewInfo } = this.props
  return talentsViewInfo.applications.find(app => app.id === appId)
}
```

---
### 使用 `Map` 或 `Object` 代替 `switch` 语句

```javascript
const getUrl = site => {
  switch (site) {
    case 'react':
      return 'https://reactjs.org/'
    case "redux":
      return 'https://redux.js.org/'
    default:
      return ''
  }
}

getUrl('react')
// "https://reactjs.org/"
```
=>
```javascript
const url = {
  react: 'https://reactjs.org/',
  redux: 'https://redux.js.org/',
}

const getUrl = site => url[site] || ''

getUrl('react')
// "https://reactjs.org/"
```

---
### 数组去重
```javascript
// 用 Set
const uniqueArray = arr => [...new Set(arr)]

// 不用 Set
const uniqueArray = arr => arr.filter((v, i) => arr.indexOf(v) === i)
```
