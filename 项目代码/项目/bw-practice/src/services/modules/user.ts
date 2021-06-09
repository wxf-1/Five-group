import { request } from "umi"


export let captchaImage=()=>{
    return request('/captchaImage')
}
export let getlogin=(data:RootObject)=>{
    return request('/login',{
        method: 'POST',
        data
    })
}