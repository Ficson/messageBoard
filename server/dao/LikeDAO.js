// 点赞DAO
var path = require('path')
daoModule = require('./DAO')
databaseModule = require(path.join(process.cwd(), 'modules/database'))

/**
 * 创建点赞
 *
 * @param  {[type]}   obj 点赞信息
 * @param  {Function} cb  回调函数
 */
module.exports.create = function (obj, cb) {
  daoModule.create('LikeModel', obj, cb)
}

/**
 * 获取点赞列表
 *
 * @param  {[type]}   conditions 查询条件
 * @param  {Function} cb         回调函数
 */
// module.exports.list = function(conditions, cb) {
//   daoModule.list("LikeModel", conditions, function (err, models) {
//     if (err) return cb(err, null)
//     cb(null, models)
//   })
// }

/**
 * 删除点赞数据
 *
 * @param  {[type]}   id 主键ID
 * @param  {Function} cb 回调函数
 */
module.exports.destroy = function (id, cb) {
  daoModule.destroy('LikeModel', id, function (err) {
    if (err) return cb(err)
    return cb(null)
  })
}

/**
 * 根据用户id判断是否点赞过
 *
 * @param  {[type]}   user_id 点赞名
 * @param  {Function} cb       回调函数
 *
 */
module.exports.existsById = function (user_id, msg_id, cb) {
  var db = databaseModule.getDatabase()
  var Model = db.models.LikeModel
  Model.exists({user_id: user_id, msg_id: msg_id}, function (err, isExists) {
    return cb(isExists)
  })
}

/**
 * 通过查询条件获取赞
 *
 * @param  {[type]}   conditions 条件
 * @param  {Function} cb         回调函数
 */
module.exports.findOne = function (conditions, cb) {
  daoModule.findOne('LikeModel', conditions, function (err, model) {
    if (err) return cb(err, null)
    cb(null, model)
  })
}
