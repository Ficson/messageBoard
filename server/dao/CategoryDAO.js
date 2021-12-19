// 模块DAO
var path = require('path')
daoModule = require('./DAO')
databaseModule = require(path.join(process.cwd(), 'modules/database'))

/**
 * 创建模块
 *
 * @param  {[type]}   obj 模块信息
 * @param  {Function} cb  回调函数
 */
module.exports.create = function (obj, cb) {
  daoModule.create('CategoryModel', obj, cb)
}

/**
 * 更新模块
 *
 * @param  {[type]}   obj 模块对象
 * @param  {Function} cb  回调函数
 */
module.exports.update = function (obj, cb) {
  daoModule.update('CategoryModel', obj.id, obj, cb)
}

/**
 * 获取模块列表
 *
 * @param  {[type]}   conditions 查询条件
 * @param  {Function} cb         回调函数
 */
module.exports.list = function (conditions, cb) {
  daoModule.list('CategoryModel', conditions, function (err, models) {
    if (err) return cb(err, null)
    cb(null, models)
  })
}

/**
 * 删除模块数据
 *
 * @param  {[type]}   id 主键ID
 * @param  {Function} cb 回调函数
 */
module.exports.destroy = function (id, cb) {
  daoModule.destroy('CategoryModel', id, function (err) {
    if (err) return cb(err)
    return cb(null)
  })
}

/**
 * 根据名称判断是否存在该模块
 *
 * @param  {[type]}   name 模块名
 * @param  {Function} cb       回调函数
 *
 */
module.exports.exists = function (name, cb) {
  var db = databaseModule.getDatabase()
  var Model = db.models.CategoryModel
  Model.exists({name: name}, function (err, isExists) {
    if (err) return cb(err)
    cb(null, isExists)
  })
}

/**
 * 根据id判断是否存在该模块
 *
 * @param  {[type]}   category_id 模块名
 * @param  {Function} cb       回调函数
 *
 */
module.exports.existsById = function (category_id, cb) {
  var db = databaseModule.getDatabase()
  var Model = db.models.CategoryModel
  Model.exists({id: category_id}, function (err, isExists) {
    if (err) return cb(err)
    cb(null, isExists)
  })
}
