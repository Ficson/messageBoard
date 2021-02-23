var express = require('express')
var bodyParser = require('body-parser');
var path = require("path");
var fs = require("fs");
var session = require('express-session')
// 路由加载
var mount = require('mount-routes')

var app = express()

/**
 *
 * 公共系统初始化
 * 
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // json格式

var database = require('./modules/database')
database.initialize(app, function (err) {
  if (err) {
    console.error('数据库连接失败 %s', err)
  }
})

/**
 *
 *	后台管理系统初始化
 * 
 */

var userService = require(path.join(process.cwd(),"services/userService"));

app.all('/api/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"),
  res.header("Access-Controld-Allow-Headers", "X-Requested-With, mytoken")
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'appliction/json;charset=utt-8')
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authoriztion,Accept, X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")
  res.header("X-Powered-By", '3.2.1')
  if (req.method == 'OPTIONS') {
    res.send(200)
  }
  else { 
    next()
  }
})

// 初始化统一响应机制
var resextra = require('./modules/resextra')
app.use(resextra)


// 初始化 后台登录 passport 策略
admin_passport = require('./modules/passport');
user = require('./routes/api/user')
message = require('./routes/api/message')
// 设置登录模块的登录函数衔接 passport 策略
admin_passport.setup(app,userService.login);
// 设置 passport 登录入口点
app.use("/api/user/register",user.register); // 注册
// app.use("/api/message/list",message.list); // 查询留言
// app.use("/api/user/logout",user.logout); // 退出
app.use("/api/user/login",admin_passport.login);

// 设置 passport 验证路径
app.use("/api/*",admin_passport.tokenAuth);


// session配置
app.use(session({
  // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: 'message',
  resave: false,
  saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))

/**
 *
 * 初始化路由
 * 
 */
mount(app, path.join(process.cwd(),"/routes"), true);

/**
 *
 * 统一处理无响应
 * 
 */

// 如果没有路径处理就返回 Not Found
app.use(function(req, res, next) {
  res.sendResult(null, 404, "Not Found")
}) 

const PORT = 8889

app.listen(PORT, () => {
  console.log(`API 接口服务启动成功，占用端口 ${PORT}`)
})

module.exports = app