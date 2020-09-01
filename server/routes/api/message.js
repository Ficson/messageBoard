var express = require("express")
var router = express.Router()
var path = require("path")
var msgServ = require(path.join(process.cwd(),"/services/MessageService"))

// 添加
router.post("/create", 
  function(req, res, next) {
  if (!req.session.user) {
    return res.sendResult(null,400,"登录失效");
  } else if(!req.body.title){
		return res.sendResult(null,400,"标题不能为空");
  } else if(!req.body.content){
		return res.sendResult(null,400,"内容不能为空");
  } else if (!req.body.category_id) {
		return res.sendResult(null,400,"模块不能为空"); 
	}
  next()
},
	function (req, res, next) {
		params = {
      "user_id": req.session.user.id,
      "title": req.body.title,
			"content": req.body.content,
			"category_id": req.body.category_id
		}
		msgServ.createMessage(params, function(err, message) {
			if (err) return res.sendResult(null, 400, err)
			res.sendResult(message, 201, '创建成功')
		})
	}
)

// 更新
router.post("/update", 
	function(req, res, next) {
		if (!req.session.user) {
			return res.sendResult(null,400,"登录失效");
		} else if(!req.body.id){
      return res.sendResult(null,400,"id不能为空");
    }
		msgServ.updateMessage(
			// {
      //   "user_id": req.session.user.id,
      //   "id": req.body.id,
      //   "title": req.body.title,
			// 	"content": req.body.content,
			// 	"category_id": req.body.category_id
			// },
			Object.assign(req.body, { "user_id": req.session.user.id}),
			function(err,message) {
				if(err) return res.sendResult(null,400,err);
				res.sendResult(message,200,"更新成功");
			}
		)
})

// 删除
router.post("/delete", 
// 验证参数
	function(req, res, next) {
		if (!req.session.user) {
			return res.sendResult(null,400,"登录失效");
		}
		else if (!req.body.id) return res.sendResult(null, 400, "留言ID不能为空")
		if (isNaN(parseInt(req.body.id))) return res.sendResult(null, 400, "ID必须要是数字")
		next()
	},
	// 处理业务逻辑
	function(req, res, next) {
		msgServ.deleteMessage({"id": req.body.id, "user_id": req.session.user.id},function(err) {
			if(err) return res.sendResult(null,400,err);
			res.sendResult(null,200,"删除成功");
		})
	}
)

// 查询列表
router.post("/getMessageList",
	// 验证参数
	// function(req,res,next) {
		// 参数验证
		// if(!req.body.pagenum || req.body.pagenum <= 0) return res.sendResult(null,400,"pagenum 参数错误");
		// if(!req.body.pagesize || req.body.pagesize <= 0) return res.sendResult(null,400,"pagesize 参数错误"); 
		// next();
	// },
	// 业务逻辑
	function(req,res,next) {
		var conditions = {
			"pagenum" : req.body.pagenum || 1,
			"pagesize" : req.body.pagesize || 10,
			"user_id": req.body.user_id,
			"category_id": req.body.category_id
		};

		msgServ.getAllMessage(
			conditions,
			function(err,result){
				if(err) return res.sendResult(null,400,err);
				res.sendResult(result,200,"获取成功");
			}
		);
	}
);

// 查询单条留言
router.post("/findMessageById",
	// 参数验证
	function(req,res,next) {
		if(!req.body.id) {
			return res.sendResult(null,400,"留言ID不能为空");
		}
		if(isNaN(parseInt(req.body.id))) return res.sendResult(null,400,"商品ID必须是数字");
		next();
	},
	// 业务逻辑
	function(req,res,next) {
		msgServ.findMessageById(req.body.id,function(err,message){
			if(err) return res.sendResult(null,400,err);
			return res.sendResult(message,200,"获取成功");
		});
	}
);

module.exports = router;