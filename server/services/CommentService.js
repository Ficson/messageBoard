var path = require("path");
var dao = require(path.join(process.cwd(),"dao/DAO"));
var commentDAO = require(path.join(process.cwd(),"dao/CommentDAO"));
var messageDAO = require(path.join(process.cwd(),"dao/MessageDAO"));
var logger = require('../modules/logger').logger();
var moment = require('moment');


// 给留言添加评论
module.exports.createComment = function(params, cb) {
    messageDAO.existsById(params.msg_id, function(err, isExists) {
      if (err) return cb(err)
      if (!isExists) {
        return cb("留言不存在");
      } else {
        commentDAO.create({
          "content": params.content,
          "msg_id": params.msg_id,
          "user_id": params.user_id,
          "like": 0,
          "type": 1, // 1： 评论 2：回复
          "create_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          "update_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        }, function (err, comment) {
          if(err) return cb("创建失败");
          result = {
            "id" : comment.id,
            "content": comment.content,
            "msg_id": comment.msg_id,
            "user_id": comment.user_id,
            "like": comment.like,
            "type": comment.type, // 1： 评论 2：回复
            "create_time": comment.create_time,
            "update_time": comment.update_time,
          };
          cb(null,result);
        })
      }
    })
}


// 回复
module.exports.replyComment = function(params, cb) {
  commentDAO.findCommentInMsg(params.msg_id, params.comment_id, function(err, isExists) {
    if (err) return cb(err)
    if (!isExists) {
      return cb("评论不存在");
    } else {
      commentDAO.create({
        "content": params.content,
        "user_id": params.user_id,
        "comment_id": params.comment_id,
        "like": 0,
        "type": 2, // 1： 评论 2：回复
        "create_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        "update_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }, function (err, comment) {
        if(err) return cb("创建失败");
        result = {
          "id" : comment.id,
          "content": comment.content,
          "user_id": comment.user_id,
          "comment_id": comment.comment_id,
          "like": comment.like,
          "type": comment.type, // 1： 评论 2：回复
          "create_time": comment.create_time,
          "update_time": comment.update_time,
        };
        cb(null,result);
      })
    }
  })
}


// 删除评论
module.exports.deleteComment = function(param, cb) {
	commentDAO.destroy(param, function(err) {
		if (err) return cb("删除失败")
		cb(null)
	})
}


