import Vue from 'vue'
let _this = Vue.prototype
// 时间格式化
export default {
  parseTime: (time, format = '{y}-{m}-{d} 星期{a} {h}:{i}:{s}') => {
    if (
      Object.prototype.toString
        .call(time)
        .replace(/(^\[object )|(\]$)/g, '')
        .toLowerCase() !== 'date'
    ) {
      time = new Date(+time)
    }

    const formatObj = {
      y: time.getFullYear(),
      m: time.getMonth() + 1,
      d: time.getDate(),
      h: time.getHours(),
      i: time.getMinutes(),
      s: time.getSeconds(),
      a: time.getDay(),
    }

    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value]
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return timeStr
  },

  // 设置 localStorage
  setLocalStorage: (name, value, maxage = 1000 * 60 * 30) => window.localStorage.setItem(name, JSON.stringify({value, maxage, settime: Date.now()})),

  // 获取指定的 localStorage
  getLocalStorage: name => {
    try {
      const retJson = JSON.parse(window.localStorage.getItem(name))

      if (retJson) {
        const isExpired = Date.now() > +retJson.settime + +retJson.maxage

        if (isExpired) {
          window.localStorage.removeItem(name)
          return null
        }

        return retJson.value
      }

      return retJson
    } catch {}

    return retJson
  },

  // 移除指定的 localStorage
  removeLocalStorage: name => {
    window.localStorage.removeItem(name)
  },

  // 深拷贝
  deepCopy: source => {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    for (const key in source) {
      if ({}.hasOwnProperty.call(source, key)) {
        if (source[key] && typeof source[key] === 'object') {
          targetObj[key] = source[key].constructor === Array ? [] : {}
          targetObj[key] = this.deepCopy(source[key])
        } else {
          targetObj[key] = source[key]
        }
      }
    }
    return targetObj
  },
  // 获取地址参数
  getUrlParam: function (name) {
    console.log(window.location.href)
    return (
      decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href) || [, ''])[1].replace(/\+/g, '%20')) ||
      null
    )
  },
  // 弹窗
  myMessage(message, type) {
    _this.$message(message, type)
  },
}
