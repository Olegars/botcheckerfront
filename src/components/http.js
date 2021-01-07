import axios from 'axios'
import store from '../store/index'
import { elasticURL, backEndURL } from '../ConfigStore'

export const HTTP = axios.create({
  baseURL: backEndURL
})
export const WEB = axios.create({
})
export const elastic = axios.create({
  baseURL: elasticURL,
  headers: { 'Content-Type': 'application/json; charset=UTF-8', Accept: 'application/json' },
  // headers: {'Content-Type': 'application/vnd.api+json'}
  transformRequest: [
    (data) => {
      if (data && data.msearch) {
        let request = ''
        for (const da in data.msearch) {
          request += '\n' + JSON.stringify(data.msearch[da])
        }
        request += '\n'
        return request
      } else {
        return JSON.stringify(data)
      }
    }
  ]
})
HTTP.interceptors.request.use((config) => {
  store.dispatch('waiting', true)
  config.headers.common.Authorization = 'Bearer ' + store.getters.GetUserAt
  return config
}, function (error) {
  return Promise.reject(error)
})
HTTP.interceptors.response.use(function (response) {
  store.dispatch('waiting', false)
  store.dispatch('banner')
  return response
}, function (error) {
  if (error.response.status === 401) {
    store.dispatch('alertMessage', 'Ошибка авторизации')
    store.dispatch('userData', { data: { logout: true }, foreign: false })
    console.log(error.response)
  }
  store.dispatch('waiting', false)
  return Promise.reject(error)
})
elastic.interceptors.request.use((config) => {
  return config
}, function (error) {
  // console.log(error);

  return Promise.reject(error)
})
