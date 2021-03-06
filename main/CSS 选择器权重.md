CSS 选择器权重

### 概述

- 权重决定了哪一条规则会被浏览器采用；
- 权重往往是一条你认为本该生效的规则没有生效的原因；
- 每种选择器都有其对应的权重；
- 如果两条规则对应同一个元素，权重较高者生效；
- 选择器权重相同时：
  - 较靠后的生效；
  - 更详细的生效；
- 内联样式权重最高；
- ID 选择器比属性选择器权重高；
- 类选择器比任意数量的元素选择器权重高；
- 一个[权重计算器](https://specificity.keegan.st/)；
- **使用 ID 选择器增加权重是一个好办法**；
- **避免使用 `!important`**；

### 权重是什么？

如果两条规则对应同一个元素，权重较高者生效。

### 权重等级

每一种选择器都有其权重等级。选择器可依权重等级分为以下四类：

- 内联样式。直接应用于特定元素。例如：`<div style="margin-left: 20px"></div>`；
- ID 选择器。例如： `#div`；
- 类、属性及伪类选择器。例如：`.classes`、`[attributes]` 及伪类 `:hover`、`：focus`等;
- 元素及伪元素选择器。例如：`:before`、`:after`；

### 如何计算权重？

从零开始，内联样式加 1000，ID 选择器加 100，类、属性及伪类选择器加 10，元素及伪元素选择器加 1。

所以，

```css
body #content .data img:hover { color: #DBEDFF; }
```

的权重为 122：`#content` 100、`.data` 10、`:hover` 10、`body` 1、`img` 1；

||选择器|权重|说明|
|---|---|---|---|
|1|`* { }`|0|
|2|`li { }`|1|一个元素|
|3|`li:first-line { }`|2|一个元素，一个伪元素|
|4|`ul li { }`|2|两个元素|
|5|`ul ol+li { }`|3|三个元素|
|6|`h1 + *[rel=up] { }`|11|一个属性，一个元素|
|7|`ul ol li.red { }`|13|一个类，三个元素|
|8|`li.red.level { }`|21|两个类，一个元素|
|9|`style=""`|1000|一个内联样式|
|10|`p { }`|1|一个 HTML 选择器|
|11|`div p { }`|2|两个 HTML 选择器|
|12|`.sith`|10|一个类选择器|
|13|`div p.sith { }`|12|两个 HTML 选择器和一个类选择器|
|14|`#sith`|100|一个 ID 选择器|
|15|`body #darkside .sith p { }`|112|HTML， ID， 类， HTML：1+100+10+1|

### 权重规则

- ID 选择器的权重比属性选择器高。例如，在 HTML 中从层叠的角度来说，选择器 `#content` 比 `[id=content]` 权重高；

- 与上下文有关的选择器比单个元素选择器权重高；

- 内嵌样式权重比外部样式高，所以：

```css
#content h1 {
  padding: 5px;
}
```

比

```html
<style type="text/css">
  #content h1 {
    padding: 10px;
  }
</style>
```

权重低。

- 后定义的规则会覆盖所有先前的、冲突的规则。
```css
p { color: red; background: yellow; }
p { color: green; }
```

段落将表现为黄色背景，绿色内容。

- 类选择器比任意数量的元素选择器权重高；

- 全局选择器 `*`、`body *` 的权重为 0000；

### !important

使用 `!important` 会使样式文件难以维护，在通常情况下尽量避免使用 `!important`。
