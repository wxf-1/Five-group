import Cookie from 'js-cookie'

const key ="authorization";

//设置登录态
export function setCookie(value:string){
    //设置一天
    Cookie.set(key,value,{expires:1})
    //设置12个小时候过期
    // let exipres=new Date(+new Date() +12*60*60*1000)
}
//清除登录态
export function removeCookie(){
    Cookie.remove(key)
}
//获取登录态
export function getCookie(){
    return Cookie.get(key)
}
