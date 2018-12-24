import { Http } from './http.js'
let http = new Http()

class Api {
  getHomeBanner(params) {
    params.url = '/api/hdqz/home/banner'
    http.sendGet(params)
  }

  getHomeArticle(params) {
    params.url = '/api/hdqz/home/article'
    http.sendGet(params)
  }
}

export { Api }