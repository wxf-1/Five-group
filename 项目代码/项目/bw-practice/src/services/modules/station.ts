import { request } from 'umi'

import { ISkillAddItem, ISkillListItem, iSkillListSkill } from '@/utils/interface';

// 获取技能要求列表
export let selectSkillList=(stationVersionId:string,searchTitle:string='')=>{
        return request('sxpt/skill/selectSkillList',{
            params:{
                stationVersionId,
                searchTitle
            }
        })
}
//添加左侧技能要求
export let inintSkill=(stationVersionId:string, parentId:string = '0')=>{
    return request('sxpt/skill/inintSkill',{
        method:'POST',
        data:{
            stationVersionId,
            parentId
        }
    })
}
// 删除当前技能要求
export let deleteSkill = (skillId: string)=>{
    return request('sxpt/skill/deleteSkill', {
        method: 'DELETE',
        params: {
            skillId
        }
    })
}
// 获取当前技能详情
export let getStationSkillDetail = (skillId: string)=>{
    return request(`sxpt/skill/selectSkillInfo/${skillId}`)
}
// 修改技能要求
export let putSkill = (data: iSkillListSkill)=>{
    return request('sxpt/skill', {
        method: 'POST',
        data
    })
}