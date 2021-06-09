// yjs问题部分请求
import { request } from 'umi';
import {questionanswer} from "@/utils/questionface"
// 请求刚开始的数据
export let getlist=(params:questionanswer)=>{
    return request("/sypt/answer/list",{params})
}
// 发送图片
export let upload = (form: FormData) => {
    return request('http://123.206.55.50:11000/upload', {
        method: 'POST',
        data: form
    })
}

// 提问
export let postanswer=(props:any)=>{
    return request("/sypt/answer",{
        method:"POST",
        data:props
    })
}
// 发送图片到数据库
export let setimgs = (data: any) => {
    return request('/system/user/profile/avatar', {
        method: 'POST',
        data,
    })
}