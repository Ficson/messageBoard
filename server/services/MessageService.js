
var path = require("path");
var dao = require(path.join(process.cwd(),"dao/DAO"));
var messageDAO = require(path.join(process.cwd(),"dao/MessageDAO"));
var categoryDAO = require(path.join(process.cwd(),"dao/CategoryDAO"));
var logger = require('../modules/logger').logger();
var moment = require('moment');

// 添加留言
module.exports.createMessage = function(params, cb) {
  categoryDAO.existsById(params.category_id, function(err, isExists) {
    if (err) return cb(err)
    if (!isExists) {
      return cb("模块不存在");
    }
    messageDAO.create({
      "title": params.title,
      "content": params.content,
      "user_id": params.user_id,
      "category_id": params.category_id,
      "create_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      "update_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      "like": 0,
    }, function (err, message) {
      if(err) return cb("创建失败");
      result = {
        "id" : message.id,
        "title" : message.title,
        "user_id": message.user_id,
        "category_id": message.category_id,
        "create_time":message.create_time,
        "update_time": message.update_time,
        "like": 0
      };
      cb(null,result);
    })
  })
  
}

//  更新留言
module.exports.updateMessage = function(params, cb) {
  messageDAO.findOne({"id": params.id, "user_id": params.user_id }, function(err, message) {
    if (err || !message) {
      return cb("查找留言错误")
    }

    if (params.category_id) {
      categoryDAO.existsById(params.category_id, function(err, isExists) {
        if (err) return cb(err)
        if (!isExists) {
          return cb("模块不存在");
        }
      })
    } 
    messageDAO.update(
      // {
      //   "id": params.id,
      //   "title": params.title,
      //   "content": params.content,
      //   "category_id": params.category_id,
      //   "user_id": message.user_id,
      // },
      Object.assign(params, {"update_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}),
      function(err, newMsg) {
        if(err) return cb(err)
         cb(null, newMsg)
      })
  })
}

// 删除留言
module.exports.deleteMessage = function(params, cb) {
  messageDAO.findOne({"id": params.id, "user_id": params.user_id }, function(err, message) {
    if (err || !message) {
      return cb("用户留言不存在")
    }
    messageDAO.destroy(params.id,function(err){
      if(err) return cb("删除失败");
      cb(null);
    });
  })
}

// 查找列表
module.exports.getAllMessage = function(conditions,cb) {
	dao.list("MessageModel",{"category_id": conditions.category_id},function(err,result) {
    if (err || !result) {
      return cb("查找失败")
    }
		if(result) {
			count = result.length;
			pagesize = parseInt(conditions.pagesize);
			pagenum = parseInt(conditions.pagenum) - 1;
			var resultDta = {};
			resultDta["total"] = count;
			resultDta["pagenum"] = pagenum;
			resultDta["pagesize"] = pagesize;
			resultDta["result"] = result;
			return cb(null,resultDta);
		}
		cb(null,result);
	});
}

// 查找单条留言
module.exports.findMessageById = function (id, cb) {
  dao.findOne("MessageModel",{"id":id },function(err,message) {
    if(err) return cb(err);
    cb(null, message)
  });
}
