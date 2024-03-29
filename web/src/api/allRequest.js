import api from '@/api'
import {apost, aget} from '@/utils/request'

export default {
  // ---- 1.用户管理 ----------
  // 登录
  login: function (data) {
    return apost({
      url: api.API_LOGIN.url,
      data: data,
      isqs: api.API_LOGIN.isqs
    })
  },
  // 登出
  logout: function (data) {
    return aget({
      url: api.API_LOGOUT.url,
      data: data,
      isqs: api.API_LOGOUT.isqs
    })
  },
  // 注册
  register: function (data) {
    return apost({
      url: api.API_USER_REGISTER.url,
      data: data,
      isqs: api.API_USER_REGISTER.isqs
    })
  },
  // 更新用户
  userUpdate: function (data) {
    return apost({
      url: api.API_USER_UPDATE.url,
      data: data,
      isqs: api.API_USER_UPDATE.isqs
    })
  },
  // 删除用户
  userDelete: function (data) {
    return apost({
      url: api.API_USER_DELETE.url,
      data: data,
      isqs: api.API_USER_DELETE.isqs
    })
  },
  // 修改密码
  userUpdatePassword: function (data) {
    return apost({
      url: api.API_USER_UPDATE_PASSWORD.url,
      data: data,
      isqs: api.API_USER_UPDATE_PASSWORD.isqs
    })
  },
  // 获取用户信息
  getUserInfo: function () {
    return aget({
      url: api.API_GET_USERINFO.url
    })
  },
  // 查询用户列表
  userList() {
    return aget({
      url: api.API_USER_LIST.url
    })
  },
  // 根据id查找用户
  userFindById() {
    return apost({
      url: api.API_USER_FIND_BY_ID.url,
      data: data,
      isqs: api.API_USER_FIND_BY_ID.isqs
    })
  },
  // ---- 2.类型管理 ----------
  // 添加类型
  categoryAdd: function (data) {
    return apost({
      url: api.API_CATEGORY_ADD.url,
      data: data,
      isqs: api.API_CATEGORY_ADD.isqs
    })
  },
  // 获取类型列表
  getCategoryList: function (data) {
    return aget({
      url: api.API_CATEGORY_LIST.url
    })
  },
  // 更新类型
  categoryUpdate: function (data) {
    return apost({
      url: api.API_CATEGORY_UPDATE.url,
      data: data,
      isqs: api.API_CATEGORY_UPDATE.isqs
    })
  },
  // 删除类型
  categoryDelete: function (data) {
    return apost({
      url: api.API_CATEGORY_DELETE.url,
      data: data,
      isqs: api.API_CATEGORY_DELETE.isqs
    })
  },
  // -------3. 留言-------------
  messageAdd: function (data) {
    return apost({
      url: api.API_MESSAGE_ADD.url,
      data: data,
      isqs: api.API_MESSAGE_ADD.isqs
    })
  },
  getMessageList: function (data) {
    return apost({
      url: api.API_MESSAGE_MESSAGE_LIST.url,
      data: data,
      isqs: api.API_MESSAGE_MESSAGE_LIST.isqs
    })
  },
  messageDelete: function (data) {
    return apost({
      url: api.API_MESSAGE_DELETE.url,
      data: data,
      isqs: api.API_MESSAGE_DELETE.isqs
    })
  },
  messageUpdate: function (data) {
    return apost({
      url: api.API_MESSAGE_UPDATE.url,
      data: data,
      isqs: api.API_MESSAGE_UPDATE.isqs
    })
  },
  findMessageById: function (data) {
    return apost({
      url: api.API_MESSAGE_FIND_MESSAGE_BY_ID.url,
      data: data,
      isqs: api.API_MESSAGE_FIND_MESSAGE_BY_ID.isqs
    })
  },
  setLike: function (data) {
    return apost({
      url: api.API_LIKE_SET.url,
      data: data,
      isqs: api.API_LIKE_SET.isqs
    })
  }

  // aaaaaaaa: function (data) {
  //   return apost({
  //     url: api.AAAAAAAAAAAA.url,
  //     data: data,
  //     isqs: api.AAAAAAAAAAAA.isqs
  //   })
  // },
}
