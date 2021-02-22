/**
 * 所有
 *  isqs: 是否是表单提交，默认是false
 *  type: 请求类型，默认是post
 */
export default {
  // -------1. 用户-------
  API_LOGIN: { url: '/api/user/login', type: 'post', isqs: false, }, // 登录
  API_LOGOUT: { url: '/api/user/logout', type: 'get', isqs: false, }, // 登出
  API_GET_USERINFO: { url: '/api/user/getUserInfo', type: 'get', }, // 获取用户信息
  API_USER_REGISTER: { url: '/api/user/register', type: 'post', isqs: false, }, // 用户注册
  API_USER_UPDATE: { url: '/api/user/update', type: 'post', isqs: false }, // 用户更新
  API_USER_DELETE: { url: '/api/user/delete', type: 'post', isqs: false }, // 用户删除
  API_USER_LIST: { url: '/api/user/findPage', type: 'post', isqs: true }, // 用户列表
  API_USER_FIND_BY_ID: { url: '/api/user/findById', type: 'post', isqs: false }, // 查找用户
  API_USER_UPDATE_PASSWORD: { url: '/api/user/updatePassword', type: 'post', isqs: false }, // 更改密码

  // -------2. 类型-------
  API_CATEGORY_ADD: { url: '/api/category/add', type: 'post', isqs: false}, // 添加类型
  API_CATEGORY_LIST: { url: '/api/category/list', type: 'get', isqs: false }, // 获取类型列表
  API_CATEGORY_UPDATE: { url: '/api/category/update', type: 'post', isqs: false }, // 更新类型
  API_CATEGORY_DELETE: { url: '/api/category/delete', type: 'post', isqs: false }, // 删除类型

  // -------3. 留言-------
  API_MESSAGE_ADD: { url: '/api/message/create', type: 'post', isqs: true }, // 添加留言
  API_MESSAGE_MESSAGE_LIST: { url: '/api/message/list', type: 'post', isqs: true }, // 留言列表
  API_MESSAGE_DELETE: { url: '/api/message/delete', type: 'post', isqs: true }, // 留言列表
  API_MESSAGE_UPDATE: { url: '/api/message/update', type: 'post', isqs: true }, // 留言更新
  API_MESSAGE_FIND_MESSAGE_BY_ID: { url: '/api/message/findMessageById', type: 'post', isqs: true }, // 查询单条留言

  // -------4. 点赞-------------
  API_LIKE_SET: { url: '/api/like/set', type: 'post', isqs: true }, // 点赞



  AAAAAAA: { url: '/aaaaaaa', type: 'post', isqs: true }, // aaaaaa








}
