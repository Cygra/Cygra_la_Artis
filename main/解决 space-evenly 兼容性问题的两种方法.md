# 解决 space-evenly 兼容性问题的两种方法

flex 从 2009 年推出到现在，已经得到了几乎所有浏览器的支持。作为一种简便的、响应式的布局方案，flex 给我们的布局开发带来了很多便利。

`justify-content` 属性是 flex 布局中很常用的属性，定义了子元素在主轴上的对齐方式。它有 `flex-start` | `flex-end` | `center` | `space-between` | `space-around` | `space-evenly` 等属性。

但是，笔者在一次开发中发现 `space-evenly` 在使用中会面临兼容性问题，在 iPhone 5s 上测试时发现设定了 `justify-content: space-evenly` 的容器中的子元素并没有按期望中的一样沿着主轴均匀分布，而是都挤在了左边。

```
.container {
  display: flex;
  justify-content: space-evenly;
}
```

查看 [Can I use space-evenly?](https://caniuse.com/?search=space-evenly) 发现，`space-evenly` 的支持范围确实相对较小。

[![seW74K.png](https://s3.ax1x.com/2021/01/07/seW74K.png)](https://imgchr.com/i/seW74K)

MDN 上对 `space-evenly` 属性的[定义](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content)是：
> flex 项都沿着主轴均匀分布在指定的对齐容器中。相邻 flex 项之间的间距，主轴起始位置到第一个 flex 项的间距，主轴结束位置到最后一个 flex 项的间距，都完全一样。

为了解决这个问题，笔者想到了两种方式：

## 利用 `flex-grow`

`flex-grow` 指定了容器的剩余空间应该如何分配给子元素。

让所有子元素同时拥有 `flex-grow: 1` 属性，它们会等分容器的空间，也就实现了「均匀分布、间距相等」的效果。

```
.container {
  display: flex;
  .child: {
    flex: 1;
  }
}
```

## 利用 `space-between`

另外一种方式是利用和 `space-evenly` 属性类似的 `space-between`。这两个属性很接近，而 `space-between` 也基本不会遇到兼容性问题。

不同的是，在 `space-evenly` 下，每个子元素的两侧都有同样的空间，而在 `space-between` 下，每行第一个元素与行首对齐，每行最后一个元素与行尾对齐。

假设在一个容器中有五个子元素，用那么这两个属性的差别可以简单表示成：

```
// space-evenly
|--子--子--子--子--子--|

// space-between
|子--子--子--子--子|
```

也就是说，`space-evenly` 会比 `space-between` 多了两边的两个空隙，而 `space-between` 的第一个和最后一个子元素是紧贴容器边缘的。

为了填补这个差异，我们可以用两个伪元素，来让容器在设定为 `space-between` 的时候，拥有七个子元素，也就拥有了「六个空隙」：

```
|伪--子--子--子--子--子--伪|
```

代码：

```
.container {
  display: flex;
  justify-content: space-between;

  &:before,
  &:after {
    content: '';
    display: block;
  }
}
```
