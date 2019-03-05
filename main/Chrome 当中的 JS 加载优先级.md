JavaScript Loading Priorities in Chrome <!-- https://addyosmani.com/blog/script-priorities/ -->

|   | 加载优先级 | 执行优先级 | 应该在何处使用 |
| :-: | -------- | --------- | ----------- |
`<head>`中的`<script>` | 中 / 高 | 非常高 - 阻塞解析 | <ul><li>影响 [FMP](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_meaningful_paint_and_hero_element_timing) 及 [FCP](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint) 内容的布局</li><li>必须在其他代码之前执行的代码</li></ul>例如<ul><li>框架 runtime(非[静态渲染](https://developers.google.com/web/updates/2019/02/rendering-on-the-web))</li><li>Polyfills</li><li>影响整个页面 DOM 结构的 A/B 测试</li></ul> 
`<link rel=preload>` + `<script async>` <br />或者<br /> `<script type=module async>` | 中 / 高 | 高 - 打断解析 | <ul><li>生成重要内容（ FMP 所需）</li><li>但不应影响首屏（[above-the-fold](https://www.abtasty.com/blog/above-the-fold/)）</li><li>触发获取动态插入内容的网络连接</li><li>需要在引入之后立即执行的代码，使用`<script async type=module>`</li></ul>例如<ul><li>在 `<canvas>` 上绘图</li></ul>
`<script async>` | 最低 / 低 | 高 - 打断解析 | 要[小心使用](https://calendar.perfplanet.com/2016/prefer-defer-over-async/)。常用来加载不重要的代码。有低加载优先级和高执行优先级的不一致行为。
`<script defer>` | 最低 / 低 | 非常低 - 在 `<body>` 标签尾部的 `<script>` 之后执行 | <ul><li>生成不重要内容的代码</li><li>提供 50% 以上页面对话会使用到的关键交互的代码</li></ul>例如<ul><li>广告</li><li>客户端或服务端渲染的框架</li></ul>
`<body>` 尾部的 `<script>` | 中 / 高 | 低 - 等待解析完成 | 注意这些代码具有中 / 高优先级
`<body>` 尾部的 `<script defer>` | 最低 / 低 - 队列尾部 | 非常低 - 在 `<body>` 尾部的 `<script>` 之后 | <ul><li>提供偶尔会使用到的交互的代码</li></ul>例如<ul><li>加载“更多文章”</li><li>“提交反馈”功能</li></ul>
`<link rel=prefetch>` + 下一个导航页面的 `<script>` | 最低 | 取决于如何使用 | 下一导航页面
