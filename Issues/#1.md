URL的完整格式可以表示成```scheme:[//[user[:password]@]host[:port]][/path][?query][#fragment]```。
Location 对象包含有关当前 URL 的信息，是Window对象的一个部分，可通过```window.location```属性来访问，也可单独访问如```window.location.pathname```。
在[Github-Wikipedia](#https://github.com/)页面打开检查，在命令行输入```window.location```，可得到如下输出：

```javascript
ancestorOrigin: DOMStringList {length: 0}
assign: ƒ ()
hash: ""
host: "en.wikipedia.org"
hostname: "en.wikipedia.org"
href: "https://en.wikipedia.org/wiki/GitHub"
origin: "https: //en.wikipedia.org"
pathname: "/wiki/GitHub"
port: ""
protocol: "https: "
reload: ƒ reload()
replace: ƒ ()
search: ""
toString: ƒ toString()
valueOf: ƒ valueOf()
Symbol(Symbol.toPrimitive): undefined
__proto__: Location
```

按序：
- >```hash: ""```
URL 的片段（fragment）部分，以“#”开头。
片段是用来指导浏览器动作的，对服务器端不产生作用。所以，HTTP请求中不包括“#”。单单改变“#”后的部分，浏览器只会滚动到相应位置，不会重新加载网页。但是，浏览器会增加一条相应访问记录。
当我们点击当前页面目录当中的某条（例如：[Licensing of repositories](#https://en.wikipedia.org/wiki/GitHub#Licensing_of_repositories)）即可跳转到页面相应的位置，体现在html中，则是```<.. id="Licensing_of_repositories" ../>```对应的位置。同时，历史记录中也会新增一条带有相应片段信息的记录。
- >```host: "en.wikipedia.org"```
主机名称和端口号。
```host = hostname + ":" + port```
当访问```localhost:3000```时则返回```"localhost:3000"```。
- >```hostname: "en.wikipedia.org"```
主机名称。
```host = hostname + ":" + port```
当访问```localhost:3000```时则返回```"localhost"```。
- >```href: "https: //en.wikipedia.org//wiki/GitHub"```
完整的URL。
- >```origin: "https: //en.wikipedia.org"```
包含页面来源的域名。只读。
- >```pathname: "/wiki/GitHub"```
当前 URL 的路径（path），以“/”开头。
- >```port: ""```
端口号。
当访问```localhost:3000```时则返回```"3000"```。
```host = hostname + ":" + port```
- >```protocol: "https: "```
当前 URL 的协议，```http:```、```https:```、```ftp:```、```file:```等。
- >```search: ""```
当前 URL 的查询部分（query），以“?”开头。
可以有多个参数，以“&”分隔。
例如，在维基百科[搜索页面](#https://en.wikipedia.org/w/index.php?search)搜索"GitHub"：
URL为
```https://en.wikipedia.org/w/index.php?search=GitHub&title=Special:Search&profile=default&fulltext=1&searchToken=adrn17aaxwzddigbhqm76pxru```
search为
```?search=GitHub&title=Special:Search&profile=default&fulltext=1&searchToken=adrn17aaxwzddigbhqm76pxru```


可以使用[qs.parse()](https://www.npmjs.com/package/qs)对页面URL的参数部分进行解析。

如，在如上所示
> https://en.wikipedia.org/w/index.php?search=GitHub&title=Special:Search&profile=default&fulltext=1&searchToken=adrn17aaxwzddigbhqm76pxru

页面的脚本中，可使用语句
```javascript
qs.parse(location.search.slice(1))
```
获取到解析为
```javascript
{
  search: GitHub,
  title: Special:Search,
  profile: default,
  fulltext: 1,
  searchToken: adrn17aaxwzddigbhqm76pxru
}
```
格式的URL参数。