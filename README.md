## 电商后台管理系统

> 电商后台管理系统，提供给商家和管理使用，采用前后端分离的模式开发，此项目只提供API，不提供页面

### 项目结构

- 用户模块
- 权限模块
- 商品模块
- 分类模块
- 订单模块

### 目录结构

- config	------ 配置文件
- middlewares	    ------ 中间件
- model     ------ 实体类
- routes     ------ 控制层
- service     ------ 服务层
- app.js     ------ 启动器
- db.js     ------ 数据库配置

### 实施流程

1.每个模块的实现顺序为：model层 --> service层 --> router层。

2.单元测试：service层写脚本测试；router层使用postman测试。

### 配置文件的环境切换

1.建立config目录，创建dev.js和prod.js分别存放对应的配置信息

2.编写index.js，实现动态切换配置的逻辑

### 编写入口文件

添加依赖：

```shell
npm i body-parser express express-async-errors mongoose morgan
```

编写app.js和db.js文件

#### app.js

```js
//引入db
require('./db')

const config = require('./config');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const express = require('express')
// 引入异常捕获处理
require('express-async-errors');

const app = express();

//注册中间件
// log中间件
app.use(morgan('combined'));

//注册自定义的中间件

// 注册body-parser中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 注册路由
app.use("/users", require('./router/account'));

// 注册异常处理中间件
app.use((err, req, res, next)=>{
    res.fail(err.toString())
});

//启动
app.listen(config.PORT);
```

#### db.js

```js
const config = require('./config');
const mongoose  = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1/${config.DB}`);

const db = mongoose.connection;

db.on('error', (err)=>{
    console.log(err);
});

db.on("open", ()=>{
    console.log("mongodb connect successfully!");
});
```

