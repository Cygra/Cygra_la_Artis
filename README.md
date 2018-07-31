# Cygra's Note

包括如下内容:

- [库](#lib)

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
