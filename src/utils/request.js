import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'

const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启loading,禁止背景点击（节流处理，防止多次无效触发）
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止背景点击
    loadingType: 'spinner', // 配置样式
    duration: 0 // 不会自动消失
  })

  // 在请求时查看token
  const token = store.getters.token
  if (token) { // token存在
    config.headers['Access-token'] = token // 配置请求头
    config.headers.platform = 'H5' // 配置运行的 平台
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么(axios 默认包装一层data)
  const res = response.data
  if (res.status !== 200) {
    // 错误提示
    Toast(res.message) // toast单例模式，后面覆盖前面的

    // 抛出一个错误的promise
    return Promise.reject(res.message)
  } else {
    // 正确情况，走业务核心逻辑，关闭loading
    Toast.clear()
  }

  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
