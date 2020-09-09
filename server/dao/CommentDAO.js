// 模块DAO
var path = require("path")
daoModule = require("./DAO")
databaseModule = require(path.join(process.cwd(), "modules/database"))

// 创建评论
module.exports.create = function(obj,cb) {
	daoModule.create("CommentModel",obj,cb);
}


// 删除评论
module.exports.destroy = function(id, user_id, cb) {
  db = databaseModule.getDatabase()
  database.driver.execQuery("SELECT * FROM comment WHERE id=? AND user_id=?",
  [ id, user_id, function(err, comment) {
      if (err) { 
        return db("查询执行出错");
      } else if (!comment){
        return db("没有权限删除该评论")
      } else {
        daoModule.destroy("CommentModel", id, function(err) {
          if (err) return cb(err)
          return cb(null)
        })
      }
    }]
  )
}

// 判断评论是否在该留言下
module.exports.findCommentInMsg = function(msg_id, comment_id, cb) {
  db = databaseModule.getDatabase()
  database.driver.execQuery("SELECT * FROM comment WHERE type=1 AND comment.msg_id = ? AND comment.comment_id = ? ",
  [ msg_id, comment_id, function(err, comment) {
      if (err) return db("查询执行出错")
      db(null, comment)
    }]
  )
}