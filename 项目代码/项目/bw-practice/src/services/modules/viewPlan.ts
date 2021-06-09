import {request} from 'umi'

// 获取班级列表
export let selectClassPlan=()=>{
    return request('/sxpt/progress/selectClassPlan');
}

// 获取选择班级列表
export let selectClassPlanInit=(classid:string,classPlanid:string)=>{
    return request('/sxpt/progress/selectClassPlanInit',{
        params:{
            classid,
            classPlanid
        }
    })
}

// 获取选择班级成员排行榜
export let classRank=(classid:string,classPlanid:string)=>{
    return request('/sxpt/progress/classRank',{
        params:{
            classid,
            classPlanid
        }
    })
}

