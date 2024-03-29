import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'
console.log('处理svg-icon')
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
