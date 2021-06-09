import {request} from 'umi'
export let getDetail=(interviewId:string)=>{
    return request(`/sypt/interview/info/${interviewId}`)
 }