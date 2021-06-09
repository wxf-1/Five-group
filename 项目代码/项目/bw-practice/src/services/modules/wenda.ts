import { request } from "@/.umi/plugin-request/request"

//获取班级信息
export let classInfo=()=>{
    return request('/sxpt/classPlan/getClassInfo')
}
//获取待处理问答信息
export let wait=(classId=9)=>{
    return request('/sxpt/answer/wait',{
        params:{
            classId,
            pageNum: 1,
            pageSize: 10
        }
    })
}
//获取所有问答的信息
export let all=(index:any)=>{
    if (index==0) {
        index=undefined
    }
    return request('/sxpt/answer/all',{
        params:{
            classId:9,
            pageNum: 1,
            pageSize: 10,
            status:index
        }
    })
}
//全部
export let selectall=(value:string)=>{
    return request('/sxpt/answer/all',{
        params:{
            classId:9,
            pageNum: 1,
            pageSize: 10,
            searchTitle:value
        }
    })
}
export let selectAnswerList=()=>{
    return request('/sxpt/askAndAnswer/selectAnswerList')
}
//取消精品
export let deleteQuality=(answerId:string)=>{
    return request('/sxpt/answer/deleteQuality',{params:{answerId}})
}
//设为精品
export let Quality=(answerId:string)=>{
    return request('/sxpt/answer/quality',{params:{answerId}})
}
//editor 上传图片
export let upload = (form: FormData) => {
    return request('http://123.206.55.50:11000/upload', {
        method: 'POST',
        data: form
    })
}
//选择其他有"正确答案"的类似问题
export let selectAnswerList2=(data:any)=>{
    return request('/sxpt/askAndAnswer/selectAnswerList',{
        method:'GET',
        params:{
            questionTitle: data.questionTitle,
            type:data.index,
            isRight:data.isRight,
            pageNum: 1,
            pageSize: 10
        }
    })
}

//批量回答
export let replyRightAnswer=(data:answer)=>{
    return request('/sxpt/answer/replyRightAnswer',{
        method:'POST',
        data
    })
}
