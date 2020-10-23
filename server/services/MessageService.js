
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
      "content": params.content,
      "user_id": params.user_id,
      "category_id": params.category_id,
      "likes": 0,
      "type": 0,
      "pid": -1,
      "isAuthor": 1,
      "create_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      "update_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    }, function (err, message) {
      if(err) return cb(err);
      result = {
        "id" : message.id,
        "user_id": message.user_id,
        "likes": message.likes,
        "type": message.type,
        "pid": message.pid,
        "isAuthor": message.isAuthor,
        "category_id": message.category_id,
        "create_time":message.create_time,
        "update_time": message.update_time,
      };
      cb(null,result);
    })
  })
}

// 添加回复
module.exports.createReply = function(params, cb) {
  messageDAO.findById(params.pid, function(err, msg) {
    let isAuthor = 0
    if (err) return cb(err)
    if (!msg) {
      return cb("要回复的留言不存在");
    } else {
      isAuthor = msg.user_id === params.user_id ? 1 : 0 // 判断是否是作者
    }
    messageDAO.create({
      "content": params.content,
      "user_id": params.user_id,
      "category_id": params.category_id,
      "likes": 0,
      "type": 1,
      "pid": params.pid,
      "isAuthor": isAuthor,
      "create_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      "update_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    }, function (err, message) {
      if(err) return cb(err);
      result = {
        "id" : message.id,
        "content": message.content,
        "user_id": message.user_id,
        "category_id": message.category_id,
        "type": message.type,
        "pid": params.pid,
        "isAuthor": params.isAuthor,
        "likes": params.likes,
        "create_time":message.create_time,
        "update_time": message.update_time,
        };
      cb(null,result);
    })
  })
}

//  更新留言
module.exports.updateMessage = function(params, cb) {
  messageDAO.findOne({"id": params.id }, function(err, message) {
    if (err || !message) {
      return cb("用户留言不存在")
    } else if (message.user_id !== params.user_id) {
      return cb("没有权限编辑该留言")
    }
    categoryDAO.existsById(params.category_id, function(err, isExists) {
      if (err) return cb(err)
      if (!isExists) {
        return cb("模块不存在");
      } 
      messageDAO.update(
        Object.assign(params, {"update_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}),
        function(err, newMsg) {
          if(err) return cb(err)
           cb(null, newMsg)
      })
    })
  })
}

// 删除留言
module.exports.deleteMessage = function(params, cb) {
  messageDAO.findOne({"id": params.id }, function(err, message) {
    if (err || !message) {
      return cb("用户留言不存在")
    } else if (message.user_id !== params.user_id) {
      return cb("没有权限编辑该留言")
    }
    messageDAO.destroy(params.id,function(err){
      if(err) return cb(err);
      cb(null);
    });
  })
}

// 查找列表
module.exports.getAllMessages = function(conditions,cb) {
	messageDAO.getMessages(conditions,function(err,result) {
    if (err || !result) {
      return cb(err)
    }
		if(result) {
			var resultDta = {
        "total": result.total,// ??
        "pagenum": conditions.pagenum,
        "pagesize": conditions.pagesize,
        "list": result.list,
      };
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
