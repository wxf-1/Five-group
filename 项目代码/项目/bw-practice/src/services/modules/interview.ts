import { request } from "umi"

export let interviewManage=()=>{
   return request('/sypt/interview/interviewManage')
}
export let deleteInterview=(interviewId:string,status:number)=>{
   return request('/sypt/interview/deleteInterview',{
      method:'GET',
      params:{
         interviewId,status
      }
   })
}
export let getinterviewManage=(searchTitle:string)=>{
   return request('/sypt/interview/interviewManage',{
      method:'GET',
      params:{
         searchTitle
      }
   })
}
export let getDetail=(interviewId:string)=>{
   return request(`/sypt/interview/info/${interviewId}`)
}