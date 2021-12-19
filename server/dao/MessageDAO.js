var path = require('path')
daoModule = require('./DAO')
databaseModule = require(path.join(process.cwd(), 'modules/database'))

/**
 * 创建留言
 *
 * @param  {[type]}   obj 留言信息
 * @param  {Function} cb  回调函数
 */
module.exports.create = function (obj, cb) {
  daoModule.create('MessageModel', obj, cb)
}

/**
 * 获取留言列表(作废)
 *
 * @param  {[type]}   conditions 查询条件
 * @param  {Function} cb         回调函数
 */
// module.exports.list = function(conditions, cb) {
//   daoModule.list("MessageModel", conditions, function (err, models) {
//     if (err) return cb(err, null)
//     cb(null, models)
//   })
// }

/**
 * 通过查询条件获取留言对象
 *
 * @param  {[type]}   conditions 条件
 * @param  {Function} cb         回调函数
 */
module.exports.findOne = function (conditions, cb) {
  daoModule.findOne('MessageModel', conditions, cb)
}

/**
 * 通过条件分页查询留言(包括评论和评论的评论还有留言)
 *
 * @param  {[type]}   key    关键词
 * @param  {[type]}   offset
 * @param  {[type]}   limit
 * @param  {Function} cb     回调函数
 */
module.exports.getMessages = function (query, cb) {
  // db = databaseModule.getDatabase()
  const {pagenum = 0, pagesize = 10, category_id = '', content = '', owner_id = '', user_id = ''} = query
  count({category_id, content, pid: -1, owner_id}, function (err1, msgCount) {
    if (err1) return cb(err1)
    let idSql = owner_id ? ` and m.id = ${owner_id}` : '' // 筛选用户的留言
    const sqlMsg =
      `select m.id,m.content, m.user_id, m.likes, m.type, m.isAuthor, m.create_time, u.username, u.avatar 
      from message as m left join user as u on m.user_id = u.id where m.content LIKE ? and m.pid=-1` +
      idSql +
      ` order by create_time DESC limit ?, ?`
    database.driver.execQuery(sqlMsg, [`%${content}%`, pagenum * pagesize, pagesize], function (err2, msgs) {
      if (err2) return cb(err2)
      // 查询是否点赞
      // setLikes(msgs, user_id)
      // 根据留言找评论
      findComments(msgs, msgAndComments => {
        return cb(null, {msgAndComments, total: msgCount})
      })
    })
  })
}

// 查找评论
function findComments(msgs, cb) {
  // 获取对应页的回复数据
  const pids = Array.isArray(msgs) ? msgs.map(i => i.id) : []
  if (pids.length) {
    const sqlReply = `select m.id,m.content, m.user_id, m.likes, m.type, m.isAuthor, m.create_time, m.pid, m.replyPeople, u.username, u.avatar 
      from message as m left join user as u on m.user_id = u.id where pid in (${pids.join(',')}) order by create_time`
    database.driver.execQuery(sqlReply, function (err3, resReply) {
      if (err3) return cb(err3)
      const msgAndComments = msgs.map(item => {
        const children = resReply.filter(i => i.pid === item.id)
        children.map(j => (j.pName = item.username))
        return {...item, children}
      })
      // setLikes(msgAndComments, user_id)
      return cb(msgAndComments)
    })
  }
}

// 设置点赞状态（应该放到MessageService中来做）
// function setLikes(msgs, user_id) {
//   msgs.forEach(item => {
//     if(!user_id) {
//       item.liked = false
//       continue
//     }
//     let sql = `select * from like where msg_id = ${item.id} and user_id=${user_id}`
//   })
// }

// 获取留言数量
function count(conditions, cb) {
  let {content = '', pid = '', category_id = '', owner_id = ''} = conditions
  let categorySql = category_id ? ` and category_id = ${category_id}` : ''
  let idSql = owner_id ? ` and id = ${owner_id}` : ''
  sql = 'SELECT count(*) as count FROM message WHERE content LIKE ? and pid = ? ' + idSql + categorySql
  database.driver.execQuery(sql, ['%' + content + '%', pid], function (err, result) {
    if (err) return cb(err)
    cb(null, result[0]['count'])
  })
}

/**
 * 通过ID获取留言对象数据
 *
 * @param  {[type]}   id 留言主键ID
 * @param  {Function} cb 回调函数
 */
module.exports.findById = function (id, cb) {
  daoModule.findById('MessageModel', id, cb)
}

/**
 * 更新留言信息
 *
 * @param  {[type]}   obj 留言对象
 * @param  {Function} cb  回调函数
 */
module.exports.update = function (obj, cb) {
  daoModule.update('MessageModel', obj.id, obj, cb)
}

/**
 * 删除留言对象数据
 *
 * @param  {[type]}   id 主键ID
 * @param  {Function} cb 回调函数
 */
module.exports.destroy = function (id, cb) {
  daoModule.destroy('MessageModel', id, function (err) {
    if (err) return cb(err)
    return cb(null)
  })
}

/**
 * 根据id判断是否存在该留言
 *
 * @param  {[type]}   category_id 模块名
 * @param  {Function} cb       回调函数
 *
 */
module.exports.existsById = function (id, cb) {
  var db = databaseModule.getDatabase()
  var Model = db.models.MessageModel
  Model.exists({id: id}, function (err, isExists) {
    if (err) return cb(err)
    cb(null, isExists)
  })
}
