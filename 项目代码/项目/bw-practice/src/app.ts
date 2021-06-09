import React from 'react';
import { IRouteComponentProps, RequestConfig, history } from 'umi';
import storeContext from './context/storeContext';
import store from './store';
import {message} from 'antd'
import { getCookie, removeCookie } from './utils/auth';
const errorCode = {
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '403': 'Forbidden',
  '404': 'Not Found',
  '500': 'Internal Server Error',
  '502': "Bad GetWay",
  '503': 'Service Unavailable'
}
const baseURL='http://111.203.59.61:8060/dev-api'
let authorization='Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjExNWNmZWQxLTgzNWMtNGE5ZS1hMDczLTczNjJhNGNmODM5YSJ9.aJ_8XNGFrN0Q0nk_R-NgPXDhcSEF63_eeaFd95ckfPtpZLqhIUWK4bpO21iYv-hZ-mfR4jPTOlE5XuEblyZOHA'
authorization='' 
export const request: RequestConfig = {
  timeout: 10000,
  errorConfig: {},
  middlewares: [],
  requestInterceptors: [(url, options) => {
    if (!/http/.test(url)) {
        url=baseURL + url   
    }
    let headers,authorization=getCookie() as string
    if(authorization){
      headers={...options.headers,authorization}
    }
    return {
      url,
      options: { ...options, interceptors: true ,headers},
    };
  }],
 // 响应拦截器
 responseInterceptors: [async (response, options) => {
   
    let data = { code: 200, msg: '' };
    try {
      data = await response.clone().json();
      // 处理网络错误
      if (data.code==401) {
          removeCookie()
          console.log(location.pathname);
          history.replace('/login')
          // history.replace(`/login?redirect=${encodeURIComponent(location.pathname)}`)
      }
      if (response.status !== 200) {
        message.error(response.statusText);
        return response;
      }
      // 处理业务错误
      if (data.code !== 200) {
        message.error(data.msg);
        return response;
      }
    } catch (e) {
      message.error(e.message);
      return response;
    }
  // console.log('response...', response, data);
    return response;
  }],
};
export function rootContainer(container:React.ReactElement){
  return React.createElement(storeContext.Provider,{value:store},container)
}
// 导航守卫
const whiteList = ['/login', '/403', '/404', '/chat'];
export function onRouteChange({location, matchedRoutes }: any) {
  const authorization = getCookie() as string;
  if (matchedRoutes.length) {
    document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
  }
  // 登陆态拦截
  if (!authorization){
    if (whiteList.indexOf(location.pathname) == -1) {
      history.replace(`/login?redirect=${encodeURIComponent(location.pathname)}`)
    }
  }
  // 把首页重定向到/teachers/postSkill
  if(location.pathname == '/'){
    console.log(location.pathname);
    history.replace('/teachers/postSkill')
  } 
}