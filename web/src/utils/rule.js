import validate from './validate'

// 1-20个字
export default {
  checkOne2Twenty: (rule, value, callback) => {
    const check = validate({label: '', value, rules: ['length'], conditions: [1, 20]})
    if (!check.result) {
      callback(new Error(check.message))
    } else {
      callback()
    }
  },
  // 验证号码格式
  checkPhone: (rule, value, callback) => {
    const check = validate({label: '手机号', value, rules: ['phone']})
    if (!check.result) {
      callback(new Error(check.message))
    } else {
      callback()
    }
  },
  // 检测英文名
  checkEname: (rule, value, callback) => {
    const check = validate({label: '英文名', value, rules: ['noChinese', 'length'], conditions: [1, 12]})
    if (!check.result) {
      callback(new Error(check.message))
    } else {
      callback()
    }
  },

  // 检测邮箱格式
  checkEmail: (rule, value, callback) => {
    const check = validate({label: '邮箱', value, rules: ['email', 'length'], conditions: [1, 50]})
    if (!check.result) {
      callback(new Error(check.message))
    } else {
      callback()
    }
  },

  // 检测1~50
  checkOne2Fifty: (rule, value, callback) => {
    const check = validate({label: '', value, rules: ['length'], conditions: [1, 50]})
    if (!check.result) {
      callback(new Error(check.message))
    } else {
      callback()
    }
  },

  // 检测1~30
  checkOne2Thirty: (rule, value, callback) => {
    const check = validate({label: '', value, rules: ['length'], conditions: [1, 30]})
    if (!check.result) {
      callback(new Error(check.message))
    } else {
      callback()
    }
  },
  // 检测1~100
  checkOne2Hundred: (rule, value, callback) => {
    const check = validate({label: '', value, rules: ['length'], conditions: [1, 100]})
    if (!check.result) {
      callback(new Error(check.message))
    } else {
      callback()
    }
  },
  // 检测转正时间
  checkPositiveTime: (rule, value, callback) => {
    if (new Date(value) < new Date()) {
      callback(new Error('转正时间不能小于当前时间'))
    } else {
      callback()
    }
  },
}
