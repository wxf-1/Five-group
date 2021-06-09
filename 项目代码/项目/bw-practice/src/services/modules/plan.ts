import { IPlanItem,  IPlanManage } from "@/utils/interfacePlan"
import { request } from "umi"

//获取班级
export let getPlanClass=()=>{
    return request('/sxpt/classPlan/getClassInfo')
}

//获取班级列表
export let getPlanList=(params:IPlanItem)=>{
    return request('/sxpt/classPlan/getPlanList',{params})
}

//获取计划管理列表
export let getPlanListManage=(params:IPlanManage)=>{
    return request('/sxpt/classPlan/getPlanListAll',{params})
}

//添加计划班级
export let addPlanClassList=(params:any)=>{
    return request(`/sxpt/classPlan/getClassStudent/${params}`)
}
//删除计划
export let delPlanItem=(params:any)=>{
    return request(`/sxpt/classPlan/deleteClassPlan/${params}`)
}

//计划管理 查看进度 获取班级
export let getViewPlanClass=(classid:string,classPlanid:string)=>{
    return request('/sxpt/progress/selectClassPlanInitAll',{
        params:{
            classid,classPlanid
        }
    })
}
//计划管理 查看进度 获取班级排行
export let getViewPlanRank=(classid:string,classPlanid:string)=>{
    return request('/sxpt/progress/classRank',{
        params:{
            classid,classPlanid
        }
    })
}


