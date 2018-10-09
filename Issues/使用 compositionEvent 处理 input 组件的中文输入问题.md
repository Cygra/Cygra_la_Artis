使用 compositionEvent 处理 input 组件的中文输入问题

当我们在网页当中使用：
```html
<input
  type="text"
  id="myInput" 
/>
```
并监听其 input 事件：
```javascript
var myInput = document.getElementById('myInput') 

myInput.addEventListener('input', listeningInput)

function listeningInput() {
  console.log(myInput.value)
}
```
时，会遇到一个问题：

当我们使用中文输入法输入汉字比如`笔记`时，会得到以下输出：

但是，可能在某些场景（事实上是大多数场景）下我们只希望得到最后的`笔记`，而不想监听输入过程。

这一问题在中文、日文、韩文等语言的输入场景下都会存在。

一种解决方法是监听 `change` 事件，但是在原生 JavaScript 当中，这一事件要按下回车键才会被触发。

另外一种解决方案是使用 `compositionEvent`，其使用方法如下：

```javascript
myInput.addEventListener('compositionend', onCompositionEnd)

function onCompositionEnd(e) {
  e.target.composing = false
 	console.log(e.target.value)
}
```

这样在控制台中就只得到输出：

不过需要注意的是，`compositionend` 单独使用并不 👌，需搭配 `compositionstart`。这样就可以做到在普通情况下监听 `input` 事件，而当监听到 `compositionstart` 事件时，移除对 `input` 事件的监听或不处理监听到的 `input` 事件，而监听 `compositionend` 事件并处理。
