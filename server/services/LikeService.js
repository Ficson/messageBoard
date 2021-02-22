var path = require("path");
var dao = require(path.join(process.cwd(),"dao/DAO"));
var likeDAO = require(path.join(process.cwd(),"dao/LikeDAO"));
var logger = require('../modules/logger').logger();
var moment = require('moment');


// 创建点赞
module.exports.createLike = function(params, cb) {
    likeDAO.create({
      "msg_id": params.msg_id,
      "user_id": user.user_id,
			"create_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
			"update_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }, function (err, like) {
      if(err) return cb(err);
			result = {};
			cb(null,result);
    })
}



// 删除点赞
module.exports.deleteLike = function(id, cb) {
	likeDAO.destroy(id, function(err) {
		if (err) return cb(err)
		cb(null)
	})
}