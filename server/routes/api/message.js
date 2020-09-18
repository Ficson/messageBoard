var express = require("express")
var router = express.Router()
var path = require("path")
var msgServ = require(path.join(process.cwd(),"/services/MessageService"))

// 添加
router.post("/create", 
  function(req, res, next) {
	// 留言
	req.body.user_id = req.userInfo.uid
	if (parseInt(req.body.type) === 0) { 
		if(!req.body.content){
			return res.sendResult(null,400,"内容不能为空");
		} else if (!req.body.category_id) {
			return res.sendResult(null,400,"模块不能为空"); 
		}
		msgServ.createMessage(Object.assign(req.body, {user_id: req.userInfo.uid}), 
			function(err, message) {
			if (err) return res.sendResult(null, 400, err)
			res.sendResult(message, 201, '创建成功')
		})
	// 回复
	} else if (parseInt(req.body.type) === 1) { 
		if (!req.body.content) {
			return res.sendResult(null,400,"内容不能为空");
		} else if (!req.body.pid) {
			return res.sendResult(null,400,"留言id不能为空");
		}
		msgServ.createReply(Object.assign(req.body, {user_id: req.userInfo.uid}), 
			function(err, message) {
			if (err) return res.sendResult(null, 400, err)
			res.sendResult(message, 201, '创建成功')
		})
	}
})

// 更新
router.post("/update", 
	function(req, res, next) {
		if(!req.body.id){
      return res.sendResult(null,400,"留言id不能为空");
    } else if (!req.body.content) {
			return res.sendResult(null,400,"内容不能为空");
		} else if (!req.body.category_id) {
			return res.sendResult(null,400,"模块不能为空"); 
		}
		msgServ.updateMessage(
			Object.assign(req.body, { "user_id": req.userInfo.uid}),
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
		if (!req.body.id) return res.sendResult(null, 400, "留言ID不能为空")
		next()
	},
	// 处理业务逻辑
	function(req, res, next) {
		msgServ.deleteMessage({"id": req.body.id, "user_id": req.userInfo.uid },function(err) {
			if(err) return res.sendResult(null,400,err);
			res.sendResult(null,200,"删除成功");
		})
	}
)

// 查询列表
router.list = function(req,res,next) {
	var conditions = {
		"pagenum" : req.body.pagenum || 0,
		"pagesize" : req.body.pagesize || 10,
		// "user_id": req.userInfo.user_id,
		"category_id": req.body.category_id,
		"content": req.body.content 
	};

	msgServ.getAllMessages(
		conditions,
		function(err,result){
			if(err) return res.sendResult(null,400,err);
			res.sendResult(result,200,"获取成功");
		}
	);
}

// 查询单条留言
router.post("/findMessageById",
	// 参数验证
	function(req,res,next) {
		if(!req.body.id) {
			return res.sendResult(null,400,"留言ID不能为空");
		}
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