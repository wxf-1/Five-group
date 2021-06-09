
import { request } from 'umi';
// 引入数据接口
import {teacherpersoncenter,password} from "@/utils/questionface"
// 请求刚开始的数据
export let getuserlist=()=>{
    return request("/getInfo")
}
// 发送修改后的数据
export let setuserlist=(data:teacherpersoncenter)=>{
    return request('/system/user/profile',{
        method:'PUT',
        data
    })
}
// 发送修改密码的请求
export let changepassword=(params:password)=>{
    return request('/system/user/profile/updatePwd',{
        method:"PUT",
        params
    })
}