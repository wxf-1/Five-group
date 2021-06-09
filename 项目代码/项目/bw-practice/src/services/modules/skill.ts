import { request } from 'umi'

import { ISkillAddItem, ISkillListItem } from '@/utils/interface';
//获取专业列表
export let getSkillLabel=()=>{
    return request('/sxpt/station/selectStationLabel')
}

//获取选中的岗位列表
export let getSkillList=(params:ISkillListItem)=>{
    return request('/sxpt/station/selectStationVersionList',{params})
}
// 添加岗位
export let addPostSkill = (data: ISkillAddItem) => {
    return request('/sxpt/station', { 
        method: 'POST',
        data
    })
}
// 获取岗位详情
export let getSkillDetail = (stationVersionId: string)=>{
    return request(`/sxpt/station/selectStationListById/${stationVersionId}`)
}

export let getSubmit=(stationVersionId:string)=>{
    console.log("stationVersionId",stationVersionId);
    return request('/sxpt/station/updateStationStatus',{params:{stationVersionId}})
}