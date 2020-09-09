var express = require("express")
var router = express.Router()
var path = require("path")
var commentServ = require(path.join(process.cwd(),"/services/CommentService"))

// 添加
router.post("/create", 
  function(req, res, next) {
    if (req.body.type === 1) { // 评论
      if (!req.body.msg_id) {
        return res.sendResult("留言id不能空",400,err); 
      } else {
        commentServ.createComment(Object.assign(req.body, {user_id: req.userInfo.uid}), 
          function(err, comment) {
          if (err) return res.sendResult(null, 400, err)
          res.sendResult(comment, 201, '创建成功')
        })
      }
    } else if(req.body.type === 2){ // 回复
      if (!req.body.comment_id) {
        return res.sendResult("评论id不能空",400,err); 
      } else {
        commentServ.replyComment(Object.assign(req.body, {user_id: req.userInfo.uid}), 
          function(err, comment) {
          if (err) return res.sendResult(null, 400, err)
          res.sendResult(comment, 201, '创建成功')
        })
      }
    }
  }
)

// 删除
router.post("/delete", 
// 验证参数
	function(req, res, next) {
		if (!req.body.id) return res.sendResult(null, 400, "评论ID不能为空")
		next()
	},
	// 处理业务逻辑
	function(req, res, next) {
		commentServ.deleteComment({"id": req.body.id, "user_id": req.userInfo.uid},function(err) {
			if(err) return res.sendResult(null,400,err);
			res.sendResult(null,200,"删除成功");
		})
	}
)

module.exports = router;