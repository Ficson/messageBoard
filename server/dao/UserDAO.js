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
module.exports.findPage = function(conditions, cb) {
  let key = conditions.key,
    offset = (conditions.pageIndex-1) * conditions.pageSize,
    limit = conditions.pageSize
  count({ key}, function (err1, total){
    let sql = "SELECT * FROM user WHERE username LIKE ? LIMIT ?,?"
    database.driver.execQuery( sql ,["%" + key + "%", offset, limit], function(err, users) {
        if (err) return cb("查询执行出错")
        cb(null, { total, users })
      }
    )
 })
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
function count (conditions, cb) {
  let {
    key = ''
  } = conditions
	sql = `SELECT count(*) as count FROM user WHERE username LIKE ?`;
		database.driver.execQuery(sql ,["%" + key + "%"],function(err,result){
			if(err) return cb(err);
			cb(null,result[0]["count"]);
		});
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