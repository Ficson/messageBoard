// 用户DAO
var path = require("path")
daoModule = require("./DAO")
databaseModule = require(path.join(process.cwd(), "modules/database"))

/**
 * 创建用户
 * 
 * @param  {[type]}   obj 用户信息
 * @param  {Function} cb  回调函数
 */
module.exports.create = function(obj,cb) {
	daoModule.create("UserModel",obj,cb);
}


/**
 * 获取用户列表
 * 
 * @param  {[type]}   conditions 查询条件
 * @param  {Function} cb         回调函数
 */
module.exports.list = function(conditions, cb) {
  daoModule.list("UserModel", conditions, function (err, models) {
    if (err) return cb(err, null)
    cb(null, models)
  })
}


/**
 * 通过查询条件获取用户对象
 * 
 * @param  {[type]}   conditions 条件
 * @param  {Function} cb         回调函数
 */
module.exports.findOne = function(conditions,cb) {
  daoModule.findOne("UserModel",conditions,cb);
}

/**
 * 条件分页查询用户
 * 
 * @param  {[type]}   key    关键词
 * @param  {[type]}   offset 
 * @param  {[type]}   limit  
 * @param  {Function} cb     回调函数
 */
module.exports.findPage = function(key, offset, limit, cb) {
  db = databaseModule.getDatabase()
  sql = "SELECT * FROM user"

  if (key) {
    sql += " WHERE username LIKE ? LIMIT ?,?"
    database.driver.execQuery(
      sql
      ,["%" + key + "%", offset, limit, function(err, users) {
        if (err) return cb("查询执行出错")
        cb(null, users)
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
 * 通过ID获取用户对象数据
 * 
 * @param  {[type]}   id 用户主键ID
 * @param  {Function} cb 回调函数
 */
module.exports.findById = function(id, cb) {
  daoModule.findById("UserModel", id, cb)
}

/**
 * 更新用户信息
 * 
 * @param  {[type]}   obj 用户对象
 * @param  {Function} cb  回调函数
 */
module.exports.update = function(obj, cb) {
  daoModule.update("UserModel", obj.id, obj, cb)
}

/**
 * 删除用户对象数据
 * 
 * @param  {[type]}   id 主键ID
 * @param  {Function} cb 回调函数
 */
module.exports.destroy = function(id, cb) {
  daoModule.destroy("UserModel", id, function(err) {
    if (err) return cb(err)
    return cb(null)
  })
}

/**
 * 获取用户数量
 * 
 * @param  {Function} cb 回调函数
 */
module.exports.count = function(cb) {
  daoModule("UserModel", cb)
}


/**
 * 判断是否存在该用户
 * 
 * @param  {[type]}   username 用户名
 * @param  {Function} cb       回调函数
 * 
 */
module.exports.exists = function(username,cb) {
	var db = databaseModule.getDatabase();
	var Model = db.models.UserModel;
	Model.exists({"username":username},function(err,isExists){
		if(err) return cb(err);
		 cb(null,isExists);
	});
}