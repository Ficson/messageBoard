
var path = require("path");
var dao = require(path.join(process.cwd(),"dao/DAO"));
var userDAO = require(path.join(process.cwd(),"dao/UserDAO"));
var logger = require('../modules/logger').logger();
var moment = require('moment');
var md5 = require('blueimp-md5')


/**
 * 用户注册
 * @param  {[type]}   username 用户名
 * @param  {[type]}   password 密码
 * @param  {Function} cb       回调
 */

module.exports.createUser = function(params,cb) {
	userDAO.exists(params.username,function(err,isExists){
		if(err) return cb(err);

		if(isExists) {
			return cb("用户名已存在");
		}

		userDAO.create({
			"username": params.username,
			"password": md5(params.password),
			"avatar": params.avatar,
			"sex": params.sex,
			"tel": params.tel,
			"email": params.email,
			"birthday": params.birthday,
			"create_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
			"update_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
		},function(err,user){
			if(err) return cb(err);
			result = {
				"id" : user.mg_id,
				"username" : user.username,
				"avatar": params.avatar,
				"sex": params.sex,
				"tel": params.tel,
				"email": params.email,
				"birthday": params.birthday,
				"create_time":user.create_time,
				"update_time": user.update_time
			};
			cb(null,result);
		});
	});
}

/**
 * 用户登录
 * @param  {[type]}   username 用户名
 * @param  {[type]}   password 密码
 * @param  {Function} cb       回调
 */
module.exports.login = function(username,password,cb) {
	logger.debug('login => username:%s,password:%s',username,password);
	logger.debug(username);
	userDAO.findOne({"username":username, "password": md5(password)},function(err,user) {
		logger.debug(err);	
		if(err || !user) return cb("用户名或密码错误");
    else {
			cb(
				null,
				{
					"id":user.id,
					"username":user.username,
					"mobile":user.tel,
					"email":user.email,
					"role_id": user.role_id
				}
      );
    }
	});
}

/**
 * 更新用户信息
 * 
 * @param  {[type]}   params 用户信息
 * @param  {Function} cb     回调函数
 */
module.exports.updateUser = function(params, cb) {
	// 没有设置username和password，会被更新吗
	userDAO.update(
		{
			"id": params.id,
			"tel": params.tel,
			"email": params.email,
			"birthday": params.birthday,
			"avatar": params.avatar,
			"sex": params.sex,
			"update_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
		},
		function(err, newUser) {
			if(err) return cb(err)
			cb(null, {
				"id": newUser.id,
				"username": newUser.username,
				"tel": newUser.tel,
				"birthday": newUser.birthday,
				"avatar": newUser.avatar,
				"sex": newUser.sex
			})
		}
	)
}

/**
 * 通过管理员 ID 进行删除操作
 * @param  {[type]}   id 用户id
 * @param  {Function} cb       回调
 */
module.exports.deleteUser = function(id, cb) {
	userDAO.destroy(id, function(err) {
		if (err) return cb(err)
		cb(null)
	})
}

/**
 * 修改密码
 * @param  {[type]}   params 用户信息
 * @param  {Function} cb       回调
 */
module.exports.updatePassword = function(params, cb) {
	userDAO.findOne({"username": params.username, "password": md5(params.oldPassword)}, function(err, user) {
		if (err || !user) {
			return cb("旧密码错误")
		} else {
			userDAO.update({
				"username": params.username,
				"password":  md5(params.newPassword),
				"id": params.id
			}, function (err, user) {
				if (err) return cb(err)
				cb(null, {})
			})
		}
	}) 
}

// 查找用户信息
module.exports.findById = function(id, cb) {
	userDAO.findById(id, function(err, user) {
		if (err || !user) {
			return cb(err)
		} else {
			cb(null, {
				"info": {
					"id": user.id,
					"username": user.username,
					"tel": user.tel,
					"birthday": user.birthday,
					"avatar": user.avatar,
					"sex": user.sex
				},
				"role": user.role_id
			})
		}
	}) 
}
// 用户列表
module.exports.findPage = function(params, cb) {
	userDAO.findPage(params, function(err, data) {
		if (err) return cb(err)
		let userDto = data.users.map(user => {
			return {
				"id": user.id,
				"username": user.username,
				"tel": user.tel,
				"birthday": user.birthday,
				"avatar": user.avatar,
				"sex": user.sex,
				"email": user.email,
				"role_id": user.role_id,
				"create_time": user.create_time
			}
		})
		cb(null, {
			total: data.total,
			result: userDto
		})
	})
}
