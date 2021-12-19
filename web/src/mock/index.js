import Mock from 'mockjs'
import api from '@/api'

Mock.setup({timeout: '200-600'})

const mockr = (url, teml) => Mock.mock(new RegExp(url), teml)
const apiArray = [
  // 用户模块-登录
  [
    api.API_LOGIN.url,
    {
      msg: '成功',
      retCode: 200,
      model: 1,
    },
  ],
  // // 登出
  // [api.API_LOGOUT.url, {
  //   'msg': '成功',
  //   'retCode': 200,
  //   'model': {}
  // }],
  // // 用户模块-获取用户信息
  [
    api.API_GET_USERINFO.url,
    {
      msg: '成功',
      retCode: 200,
      model: {
        role: 1,
        info: {name: '吴彦祖'},
      },
    },
  ],
]
apiArray.forEach(item => mockr(item[0], item[1]))
