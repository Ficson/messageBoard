// import { parseTime } from '@/utils'
import Vue from 'vue'
import moment from 'moment'


let _this = Vue.prototype
/**
 * 转换时间格式
 * @param {number} time
 */
export function formatDatetime (time) {
  if (typeof time === 'number') return _this.$utils.parseTime(+time, '{y}-{m}-{d} {h}:{i}:{s}')
  return time
}

/**
 * @param {number} time
 */
export function timeAgo (time) {
  time = new Date(time).getTime()
  let now = new Date().getTime()
  let oneMinute = 60000
  let oneHour = oneMinute * 60
  let oneDay = oneHour * 24
  let defTime = now - time
  if (defTime > oneDay * 4) {
    return _this.$utils.parseTime(time, '{y}-{m}-{d} {h}:{i}:{s}')
  } else if (defTime > oneDay) {
    return Math.floor(defTime / oneDay) + '天前'
  } else if (defTime > oneHour) {
    return Math.floor(defTime / oneHour) + '小时前'
  } else if (defTime > oneMinute * 30) {
    return '半小时前'
  } else if (defTime > oneMinute * 5) {
    return '5分钟前'
  } else {
    return '刚刚'
  }
}

/**
 * 金额转换 分-元
 * @param {number} value
 */
export function moneyF2Y (value) {
  return (parseFloat(value) / 100).toFixed(2)
}

/**
 * 10000 转换为 "10,000" 可用于数目大的金额转化
 * @param {number} num
 */
export function toThousandFilter (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 第一位大写
 * @param {String} string
 */
export function uppercaseFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
