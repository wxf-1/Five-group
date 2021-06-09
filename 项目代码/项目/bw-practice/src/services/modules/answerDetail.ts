import {request} from 'umi';
import {ISAnswerDetailIte, ISsetAntuor, Responsevisble} from '@/utils/answerDetailface';
interface answerEdit{
    answerId: string,questionValue:string
  }
  
export let answerDetails=(answerDetailID:string) => {
    return request(`/sypt/answer/${answerDetailID}`)
}
export let anserDetailComment = (params:ISAnswerDetailIte) => {
    return request('/sypt/reply/answerList',{params})
}
//添加认证
export let answerAuthentication = (params:string) => {
    return request(`/sypt/reply/authenticationReply?answerReplyId=${params}`)
}
//撤销认证
export let removeAnswer = (replyId:string) => {
    return request(`/sypt/reply/deleteAuthenticationReply?answerReplyId=${replyId}`)
}
//设为精品
export let  addBoutique = (answerDetailID:string) => {
    return request(`/sxpt/answer/quality?answerId=${answerDetailID}`)
}
//取消精品
export let  remoteBoutique = (answerDetailID:string) => {
    return request(`/sxpt/answer/deleteQuality?answerId=${answerDetailID}`)
}
//屏蔽评论
export let  shielOnChange = (replyId:string) => {
    return request(`/sxpt/reply/shield?answerReplyId=${replyId}`)
}
//取消屏蔽评论
export let  removeOnChange = (replyId:string) => {
    return request(`/sxpt/reply/deleteShield?answerReplyId=${replyId}`)
}
//发布评论
export let addAnswerEditor = (data:answerEdit) => {
    return request('/sypt/answer/reply',{
        method:'POST',
        data
    })
}

//Table表格
export let ResponsevisbleTable = (params:Responsevisble) => {
    return request('/sxpt/askAndAnswer/selectAnswerList',{params})
}