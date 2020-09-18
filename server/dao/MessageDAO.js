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
 * 通过条件分页查询留言(包括评论和评论的评论)
 * 
 * @param  {[type]}   key    关键词
 * @param  {[type]}   offset 
 * @param  {[type]}   limit  
 * @param  {Function} cb     回调函数
 */

// module.exports.findPage = function(key, offset, limit, cb) {
//   db = databaseModule.getDatabase()
//   database.driver.execQuery("SELECT m.id, m.content, m.category_id, m.user_id, m.create_time, m.update_time, m.likes from message as m" + 
//   "WHERE msg_title LIKE ? LIMIT ?,?" + 
//   "LEFT JOIN user as u On m.user_id=.id",
//   ["%" + key + "%", offset, limit, function(err, msgs) {
//       if (err) return db("查询执行出错")
//       // db(null, users)
//       findComment(msgs)
//     }]
//   )
// }

// function findComment(msgs) {
//   msgs.forEach(item => {
//     db = databaseModule.getDatabase()
//     database.driver.execQuery("SELECT  FROM comment WHERE msg_id = ?",
//     [item.id, function(err, msgs) {
        
//       }]
//     )
//   })
// }

module.exports.getMessages = function(query, cb) {
  // db = databaseModule.getDatabase()
  const { pagenum = 0, pagesize = 10, category_id = '', content = ''} = query
  count({ category_id, content, pid: -1 }, function (err1, msgCount){
      if (err1) return cb(err1)
      const sqlMsg = `select m.id,m.content, m.user_id, m.likes, m.type, m.isAuthor, m.create_time, u.username, u.avatar 
      from message as m left join user as u on m.user_id = u.id where m.content LIKE ? and m.pid=-1 order by create_time DESC limit ?, ?`
      database.driver.execQuery(sqlMsg, [`%${content}%`, pagenum * pagesize, pagesize], function(err2, resMsg) {
        if (err2) return cb(err2)
        findComments(resMsg, list =>{
          return cb(null,{
            list,
            total: msgCount,
          })
        })
      })
   })
}

function findComments(resMsg, cb) {
  // 获取对应页的回复数据
  const pids = Array.isArray(resMsg) ? resMsg.map(i => i.id) : []
  if (pids.length) {
      const sqlReply = `select m.id,m.content, m.user_id, m.likes, m.type, m.isAuthor, m.create_time, m.pid, u.username, u.avatar 
      from message as m left join user as u on m.user_id = u.id where pid in (${pids.join(',')}) order by create_time`
      database.driver.execQuery(sqlReply, function(err3, resReply) {
        if (err3) return cb(err3)
        const list = resMsg.map(item => {
        const children = resReply.filter(i => i.pid === item.id)
          children.map(j => j.pName = item.username)
          return {
              ...item,
              children
          }
        })
    
      return cb(list)
    })
  }
}

// 获取留言数量
function count(conditions, cb) {
  let {
    content = '',
    pid = '',
    category_id = ''
  } = conditions
	sql = `SELECT count(*) as count FROM message WHERE content LIKE ? and pid = ? ${category_id ? 'and category_id = ?' + category_id: '' }`;
		database.driver.execQuery(sql ,["%" + content + "%", pid],function(err,result){
			if(err) return cb(err);
			cb(null,result[0]["count"]);
		});
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
 * 根据id判断是否存在该留言
 * 
 * @param  {[type]}   category_id 模块名
 * @param  {Function} cb       回调函数
 * 
 */
module.exports.existsById = function(id,cb) {
	var db = databaseModule.getDatabase();
	var Model = db.models.MessageModel;
	Model.exists({"id": id},function(err,isExists){
		if(err) return cb(err);
		 cb(null,isExists);
	});
}