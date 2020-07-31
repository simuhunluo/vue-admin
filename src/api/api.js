import http from '../utils/http'
// 参考文章 https://mp.weixin.qq.com/s?src=11&timestamp=1595982872&ver=2489&signature=ZZVcwL-5rjoJsm9e7ec*NW56oOFVM2nkwNOksVbd*dqdaKdZh8iG8PuqAkWSNBJCiCuMi9OSgTLfBnOU0pgfBBArfdhv9ef5s9zU*xTpqCUzo-1qIPWVb-8X7F3njag7&new=1

// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let baseUrl = "http://localhost:8081"
let resquest = "/log-ui"

// 获取树列表
export function getTree(params) {
    return http.get(`${baseUrl}` + `${resquest}/tree`, params)
}

// // get请求
// export function getListAPI(params){
//     return http.get(`${resquest}/getList.json`,params)
// }
// // post请求
// export function postFormAPI(params){
//     return http.post(`${resquest}/postForm.json`,params)
// }
// // put 请求
// export function putSomeAPI(params){
//     return http.put(`${resquest}/putSome.json`,params)
// }
// // delete 请求
// export function deleteListAPI(params){
//     return http.delete(`${resquest}/deleteList.json`,params)
// }