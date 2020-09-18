/**
 * 封装axios方法
 */
import router from '@/router';
import axios from 'axios';
import qs from 'qs';
import NProgress from 'nprogress';
import {MessageBox} from 'element-ui';
import Vue from 'vue'
let _this = Vue.prototype

// 创建axios实例
const request = axios.create ({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000,
  withCredentials: true, // 是否开启跨域请求验证
});

// request拦截器
request.interceptors.request.use (
  config => config,
  error => Promise.reject (error)
);

// response拦截器
request.interceptors.response.use (
  response => {
    console.log(response)
    const {status, data: {retCode, msg, model}} = response;
    if (status !== 200 && (/^2/.test(retCode+''))) {
      errCodeHandle (retCode, msg);
      return Promise.reject ({retCode, msg});
    }
    return model;
  },
  error => {
    if (
      error.toString () === 'Error: Network Error' ||
      error.toString ().indexOf ('Error: timeout') > -1
    ) {
      errCodeHandle ('network error', '网络异常，请重试');
      return Promise.reject (error);
    }
    return Promise.reject (error);
  }
);

// 错误码处理
const errCodeHandle = (retCode = '', msg = '') => {
  if (retCode.toString () === '401') {
    // 此处的20003是未登录的状态码
    if (_this.$utils.getLocalStorage ('adminToken')) {
      MessageBox.alert ('请重新登录', '登录无效', {
        confirmButtonText: '确定',
        type: 'error',
        showClose: false,
        roundButton: true,
        callback () {
          router.push ('/login');
          NProgress.done ();
        },
      });
    } else {
      router.push ('/login');
      NProgress.done ();
    }
  } else {
    MessageBox.alert (msg || '未知错误  错误码：' + retCode, '操作失败', {
      confirmButtonText: '确定',
      type: 'error',
      roundButton: true,
    });
  }
};

export const aget = ({url = '', params = {}, opts = {}} = {}) =>
  request.get (url, Object.assign ({}, {params}, opts));
export const apost = (
  {url = '', data = {}, params = {}, opts = {}, isqs = false} = {}
) => {
  if (isqs)
    Object.assign (opts, {transformRequest: [data => qs.stringify (data)]});
  return request.post (url, data, Object.assign ({}, {params}, opts));
};


// 封装get和post请求
// const $request = ({api, data = {}, params = {}} = {}) => {

