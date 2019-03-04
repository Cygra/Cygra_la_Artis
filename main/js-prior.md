<!-- https://addyosmani.com/blog/script-priorities/ -->


|   | 加载优先级 | 执行优先级 | 应该在何处使用 |
| - | -------- | --------- | ----------- |
`<head>`中的`<script>` | 中 / 高 | 非常高 - 阻塞解析 | <ul><li>影响 [FMP](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_meaningful_paint_and_hero_element_timing) 及 [FCP](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint) 内容的布局</li><li>必须在其他代码之前执行的代码</li></ul><br/>例如<ul><li>框架 runtime(非[静态渲染](https://developers.google.com/web/updates/2019/02/rendering-on-the-web))</li><li>Polyfills</li><li>影响整个页面 DOM 结构的 A/B 测试</li></ul> 
`<link rel=preload>` + `<script async>` <br />或者<br /> `<script type=module async>` | 中 / 高 | 高 - 打断解析 | <ul><li>生成重要内容（ FMP 所需）</li><li>但不应影响首屏（[above-the-fold](https://www.abtasty.com/blog/above-the-fold/)）</li><li>触发获取动态插入内容的网络连接</li></ul>
