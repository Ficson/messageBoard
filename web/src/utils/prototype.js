import utils from '@/utils' // 公共方法
import validate from '@/utils/validate' // 公共验证方法
import initRules from '@/utils/initRules' // 初始化验证规则
import selectList from '@/utils/selectList' // 初始化验证规则
import allRequest from '@/api/allRequest' // api
import { aget, apost } from '@/utils/request'
import api from '@/api'

export default {
  install (Vue, options) {
    for(const key in api) Vue.prototype[key] = api[key];
    Vue.prototype.$utils = utils
    Vue.prototype.$validate = validate
    Vue.prototype.$initRules = initRules
    Vue.prototype.$selectList = selectList
    Vue.prototype.$allRequest = allRequest
    Vue.prototype.$request = ({api, data = {}, params = {}} = {}) => {

      if(api.type === 'get') {

        return aget({
          url: api.url,
          params,
          opts: api.opts || {}
        });
      } else {

        return apost({
          url: api.url,
          isqs: api.isqs || false,
          data,
          params,
          opts: api.opts || {}
        });
      }
    }
  }
}

