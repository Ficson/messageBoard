var path = require("path");
var dao = require(path.join(process.cwd(),"dao/DAO"));
var likeDAO = require(path.join(process.cwd(),"dao/LikeDAO"));
var messageDAO = require(path.join(process.cwd(),"dao/MessageDAO"));
var logger = require('../modules/logger').logger();
var moment = require('moment');


// 创建点赞
module.exports.createLike = function(params, cb) {
    likeDAO.create({
      "msg_id": params.msg_id,
      "user_id": params.user_id,
			"create_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
			"update_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }, function (err, like) {
			if(err) return cb(err);
			// 点赞数加一
			setLike(params.msg_id, 1)
			result = {};
			cb(null,result);
    })
}

function setLike (id, status) {
	messageDAO.findOne({"id": id }, function(err, message) {
		messageDAO.update({"id": id, 'likes': (message.likes + status)}, function(err, newMsg) {
		})
	})
}


// 删除点赞
module.exports.deleteLike = function(params, cb) {
	likeDAO.findOne(params, function(err,like) {
    if(err) {
		 return cb("找不到该赞");
		}
		// 删除点赞
		setLike(params.msg_id, -1)
		likeDAO.destroy(like.id, function(err) {
			if (err) return cb(err)
			cb(null)
		})
		// 点赞数减一
	});

}