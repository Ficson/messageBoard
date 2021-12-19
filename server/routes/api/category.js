var express = require('express')
var router = express.Router()
var path = require('path')
var categoryServ = require(path.join(process.cwd(), '/services/CategoryService'))

// 添加
router.post(
  '/create',
  function (req, res, next) {
    if (!req.body.name) {
      return res.sendResult(null, 400, '模块名不能为空')
    }
    if (!req.userInfo.rid !== 1) {
      return res.sendResult(null, 400, '非管理员，无权限')
    }
    next()
  },
  function (req, res, next) {
    params = {
      name: req.body.name,
    }
    categoryServ.createCategory(params, function (err, category) {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(category, 201, '创建成功')
    })
  }
)

// 删除模块
router.post(
  '/delete',
  // 验证参数
  function (req, res, next) {
    if (!req.body.id) {
      return res.sendResult(null, 400, '模块id不能为空')
    }
    next()
  },
  // 处理业务逻辑
  function (req, res, next) {
    categoryServ.deleteCategory(req.body.id, function (err) {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(null, 200, '删除成功')
    })
  }
)

// 更新模块
router.post(
  '/update',
  // 验证参数
  function (req, res, next) {
    if (!req.body.id) {
      return res.sendResult(null, 400, '模块id不能为空')
    } else if (!req.body.name) {
      return res.sendResult(null, 400, '模块名不能为空')
    }
    next()
  },
  // 处理业务逻辑
  function (req, res, next) {
    categoryServ.updateCategory(
      {
        id: req.body.id,
        name: req.body.name,
      },
      function (err) {
        if (err) return res.sendResult(null, 400, err)
        res.sendResult(null, 200, '更新成功')
      }
    )
  }
)

// 查询模块
router.get('/list', function (req, res, next) {
  categoryServ.getAllCategorys(function (err, result) {
    if (err) return res.sendResult(null, 400, err)
    res.sendResult(result, 200, '获取成功')
  })
})

module.exports = router
