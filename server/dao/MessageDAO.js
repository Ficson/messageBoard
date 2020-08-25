var path = require("path")
daoModule = require("./DAO")
databaseModule = require(path.join(process.cwd(), "modules/database"))

/**
 * 创建留言
 * 
 * @param  {[type]}   obj 留言信息
 * @param  {Function} cb  回调函数
 */
module.exports.create = function(obj,cb) {
	daoModule.create("MessageModel",obj,cb);
}


/**
 * 获取留言列表
 * 
 * @param  {[type]}   conditions 查询条件
 * @param  {Function} cb         回调函数
 */
module.exports.list = function(conditions, cb) {
  daoModule.list("MessageModel", conditions, function (err, models) {
    if (err) return cb(err, null)
    cb(null, models)
  })
}

/**
 * 通过查询条件获取留言对象
 * 
 * @param  {[type]}   conditions 条件
 * @param  {Function} cb         回调函数
 */
module.exports.findOne = function(conditions,cb) {
  daoModule.findOne("MessageModel",conditions,cb);
}

/**
 * 通过条件分页查询留言
 * 
 * @param  {[type]}   key    关键词
 * @param  {[type]}   offset 
 * @param  {[type]}   limit  
 * @param  {Function} cb     回调函数
 */
module.exports.findPage = function(key, offset, limit, cb) {
  db = databaseModule.getDatabase()
  sql = "SELECT * FROM message"

  if (key) {
    sql += " WHERE msg_title LIKE ? LIMIT ?,?"
    database.driver.execQuery(
      sql
      ,["%" + key + "%", offset, limit, function(err, users) {
        if (err) return db("查询执行出错")
        db(null, users)
      }]
    )
  } else {
    sql += " LIMIT ?,? "
    database.driver.exeQuery(sql, [offset, limit], function(err, users) {
      if (err) return cb("查询执行出错")
      cb(null, user)
    })
  }
}

/**
 * 通过ID获取留言对象数据
 * 
 * @param  {[type]}   id 留言主键ID
 * @param  {Function} cb 回调函数
 */
module.exports.findById = function(id, cb) {
  daoModule.findById("MessageModel", id, cb)
}

/**
 * 更新留言信息
 * 
 * @param  {[type]}   obj 留言对象
 * @param  {Function} cb  回调函数
 */
module.exports.update = function(obj, cb) {
  daoModule.update("MessageModel", obj.id, obj, cb)
}

/**
 * 删除留言对象数据
 * 
 * @param  {[type]}   id 主键ID
 * @param  {Function} cb 回调函数
 */
module.exports.destroy = function(id, cb) {
  daoModule.destroy("MessageModel", id, function(err) {
    if (err) return cb(err)
    return cb(null)
  })
}

/**
 * 获取留言数量
 * 
 * @param  {Function} cb 回调函数
 */
module.exports.count = function(cb) {
  daoModule("MessageModel", cb)
}

