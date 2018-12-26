import { Http } from './http.js'
import { config } from '../config.js'
let http = new Http()

class Api {
  getUploadToken(params) {
    params.url = '/api/hdqz/app/getuploadtoken'
    http.sendGet(params)
  }

  getHomeBanner(params) {
    params.url = '/api/hdqz/home/banner'
    http.sendGet(params)
  }
  getHomeArticle(params) {
    params.url = '/api/hdqz/home/article'
    http.sendGet(params)
  }

  getUserInfo(params) {
    params.url = '/api/hdqz/user/info'
    http.sendGet(params)
  }
  userLogin(params) {
    params.url = '/api/hdqz/user/login'
    http.sendPost(params)
  }

  publishActivity(params) {
    params.url = '/api/hdqz/activity/publish'
    http.sendPost(params)
  }
  getAllActivity(params) {
    params.url = '/api/hdqz/activity/getall'
    http.sendGet(params)
  }
  getActivityDetail(params) {
    params.url = '/api/hdqz/activity/getdetail'
    http.sendGet(params)
  }
  shareActivity(params) {
    params.url = '/api/hdqz/activity/share'
    http.sendPost(params)
  }
  joinActivity(params) {
    params.url = '/api/hdqz/activity/join'
    http.sendPost(params)
  }
}

export { Api }