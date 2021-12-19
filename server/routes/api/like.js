var express = require('express')
var router = express.Router()
var path = require('path')
var likeServ = require(path.join(process.cwd(), '/services/LikeService'))

// 点赞
router.post(
  '/set',
  function (req, res, next) {
    if (!req.body.msg_id) {
      return res.sendResult(null, 400, '留言id不能为空')
    }
    // if(!req.body.user_id){
    // 	return res.sendResult(null,400,"用户id不能为空");
    // }
    if (!req.userInfo.uid) {
      return res.sendResult(null, 400, '未登录，无法点赞')
    }
    if (!req.body.status) {
      return res.sendResult(null, 400, 'status为空')
    }
    next()
  },
  function (req, res, next) {
    let params = {
      msg_id: parseInt(req.body.msg_id),
      user_id: req.userInfo.uid,
    }
    if (req.body.status == 1) {
      // 点赞
      likeServ.createLike(params, function (err, category) {
        if (err) return res.sendResult(null, 400, err)
        res.sendResult(category, 201, '点赞成功')
      })
      // 取消点赞
    } else if (req.body.status == -1) {
      likeServ.deleteLike(params, function (err, category) {
        if (err) return res.sendResult(null, 400, err)
        res.sendResult(category, 201, '取消点赞成功')
      })
    }
  }
)

module.exports = router
