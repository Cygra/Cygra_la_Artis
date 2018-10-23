本文译自 [Understanding REST](https://spring.io/understanding/REST)

REST（Representational State Transfer）由Roy Fielding于2000年在他的[博士论文](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)中引入和定义。 REST是用于设计分布式系统的架构风格。 它不是标准，而是一组约束，例如无状态，具有客户端/服务器关系和统一接口。 REST与HTTP并不严格相关，但它经常与之相关。

### REST 的原则

- 资源暴露出简单的易于理解的目录结构的 URI；
- 使用 JSON 或 XML 来表达对象和属性；
- 明确使用 HTTP 方法（例如GET、POST、PUT、DELETE、PATCH）；
- 不在服务器端存储不同请求之间的客户端上下文，客户端保存对话状态；

### HTTP 方法

使用 HTTP 方法将 CRUD （create、retrieve、update、delete）对应到 HTTP 请求上。

#### GET

检索信息。 GET请求必须是安全且[幂等](https://en.wikipedia.org/wiki/Idempotence#Computer_science_meaning)的，这意味着使用相同参数无论重复多少次，结果都是相同的。 它们可能有副作用，但用户并不期望它们，因此它们对系统的操作并不重要。 请求也可以是部分或有条件的。

检索 ID 为 1 的地址：
```
GET /addresses/1
```

#### POST

请求 URI 对应的资源对指定实体进行操作。POST 通常被用来创建一个实体，但也可以用来更新。

创建一个新的地址：
```
POST /addresses
```

#### PUT

将实体存储在 URI 中。 PUT可以创建新的实体或更新现有实体。 PUT请求是幂等的。 幂等性是 PUT 与 POST 请求之间的主要区别。

修改 ID 为 1 的地址：
```
PUT /addresses/1
```

⚠️ PUT 替代一个既有的实体。如果只提供了数据的子集，其余部分将被替换成空的或者 `null`。

#### PATCH

用来更新位于指定 URI 的实体的特定字段。既不安全也不幂等（[RFC 5789](https://tools.ietf.org/html/rfc5789)），因为 PATCH 不能保证整个资源都被更新。

```
PATCH /addresses/1
```

#### DELETE

请求删除一个资源。删除不一定是立即发生的，而可能是异步的或是一个长时间进行的请求。

删除 ID 为 1 的地址：

```
DELETE /addresses/1
```

#### HTTP 状态码

HTTP 状态码表明了 HTTP 请求的状态。
- 1XX - 消息
- 2XX - 成功
- 3XX - 重定向
- 4XX - 客户端错误
- 5XX - 服务端错误

#### 媒体类型

`Accept` 和 `Content-Type` HTTP 头可用于描述 HTTP 请求中发送或请求的内容。 如果客户端在 JSON 中请求响应，则可以将 `Accept` 设置为 `application/json`。 相反，在发送数据时，将 `Content-Type` 设置为 `application/xml` 会告诉客户端请求中发送的数据是 XML。
