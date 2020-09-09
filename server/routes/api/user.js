var express = require("express")
var router = express.Router()
var path = require("path")
var userServ = require(path.join(process.cwd(),"/services/UserService"))


// 注册
router.register = function(req, res, next) {
	if(!req.body.username){
		return res.sendResult(null,400,"用户名不能为空");
	}
	if(!req.body.password) {
		return res.sendResult(null,400,"密码不能为空");
	}
	userServ.createUser(req.body, function(err, user) {
		if (err) return res.sendResult(null, 400, err)
		res.sendResult(user, 201, '创建成功')
		// res.redirect('/api/user/login')
	})
},



// 登录
// router.post('/login', 
// 	function (req, res, next) {
// 		var params = req.body;
// 		if(!params.username){
// 			return res.sendResult(null,400,"用户名不能为空");
// 		}
// 		if(!params.password) {
// 			return res.sendResult(null,400,"密码不能为空");
// 		}
// 		login(req, res, params)
// })

// function login (req, res, params) {
// 	userServ.login(params.username, params.password, function(err,user){
// 		console.log(user)
// 		if(err) return res.sendResult(null,400,err);
// 		// 存储session
// 		req.session.user = {
// 			"id": user.id,
// 			"username": user.username
// 		}
// 		res.sendResult(user,200,"登录成功");
// 	});
// }

// 退出登录（感觉这个方法没卵用）
// router.logout = function (req, res, next) {
// 		req.session = {}  // 销毁session
// 		req.logOut()
// 		res.sendResult(null,200,"登出成功");
// }

// 删除用户
router.post("/delete", 
// 验证参数
	function(req, res, next) {
		if (!req.body.id) return res.sendResult(null, 400, "用户ID不能为空")
		if (isNaN(parseInt(req.body.id))) return res.sendResult(null, 400, "ID必须要是数字")
		next()
	},
	// 处理业务逻辑
	function(req, res, next) {
		userServ.deleteUser(req.body.id,function(err) {
			if(err) return res.sendResult(null,400,err);
			res.sendResult(null,200,"删除成功");
		})
	}
)

// 更新用户
router.post("/update", 
	function(req, res, next) {
		userServ.updateUser(
			Object.assign(req.body, { id: req.userInfo.uid}),
			function(err,user) {
				if(err) return res.sendResult(null,400,err);
				res.sendResult(user,200,"更新成功");
			}
		)
})

// 修改密码
router.post("/updatePassword", function (req, res, next) {
	if (!req.body.oldPassword) {
		return res.sendResult(null,400,"旧密码不能为空");
	} else if (!req.body.newPassword) {
		return res.sendResult(null,400,"新密码不能为空");
	}
	userServ.updatePassword(
		{
			"id": req.userInfo.uid,
			"oldPassword": req.body.oldPassword,
			"newPassword": req.body.newPassword
		}, function (err, user) {
			if(err) return res.sendResult(null,400,err);
			res.sendResult(user,200,"修改成功");
		}
	)
})

module.exports = router;