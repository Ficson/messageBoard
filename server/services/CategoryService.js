var path = require('path')
var dao = require(path.join(process.cwd(), 'dao/DAO'))
var categoryDAO = require(path.join(process.cwd(), 'dao/CategoryDAO'))
var logger = require('../modules/logger').logger()
var moment = require('moment')

// 创建模块
module.exports.createCategory = function (params, cb) {
  categoryDAO.exists(params.name, function (err, isExists) {
    if (err) return cb(err)
    if (isExists) {
      return cb('模块已存在')
    }
    categoryDAO.create(
      {
        name: params.name,
        create_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        update_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
      function (err, category) {
        if (err) return cb(err)
        result = {
          id: category.id,
          name: category.name,
          create_time: category.create_time,
          update_time: category.update_time,
        }
        cb(null, result)
      }
    )
  })
}

// 更新模块
module.exports.updateCategory = function (params, cb) {
  categoryDAO.update(
    {
      id: params.id,
      name: params.name,
      update_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    },
    function (err, category) {
      if (err) return cb(err)
      cb(null, {
        id: category.id,
        name: category.name,
        create_time: category.create_time,
        update_time: category.update_time,
      })
    }
  )
}

// 模块列表
module.exports.getAllCategorys = function (cb) {
  dao.list('CategoryModel', {}, function (err, categories) {
    if (err) return cb(err)
    cb(null, categories)
  })
}

// 删除模块
module.exports.deleteCategory = function (id, cb) {
  categoryDAO.destroy(id, function (err) {
    if (err) return cb(err)
    cb(null)
  })
}
