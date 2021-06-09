import { AddDefence, DefenceListParam } from '@/utils/interfacePrac'
import {request} from 'umi'

// 获取选中专业列表
export let getDefenceList=(params:DefenceListParam)=>{
    return request('/sxpt/defence/getDefenceList',{params});
}

// 答辩列表删除
export let deleteDefence=(id:string)=>{
    return request(`/sxpt/defence/deleteDefence/${id}`,{
        method:'DELETE'
    });
}

// 添加答辩 获取班级
export let getClasssPlanTree=()=>{
    return request('/sxpt/defence/getClasssPlanTree');
} 

// 添加答辩
export let addDefence=(data:AddDefence)=>{
    return request('/sxpt/defence',{
        method:'POST',
        data
    })
}
