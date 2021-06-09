import { request } from 'umi'

import {Igetsxtype} from '@/utils/interface'
export let getdata = () => {
    return request('/sxpt/project/selectProjectList')
}

export let detaildate =(params:any) =>{
    return request('/sxpt/project/selectProjectByVserionId',{params})
}

export let getlist = () => {
    return request('/sxpt/label/selectTradeList')
}

export let getaddlistone =() =>{
return request('/sxpt/label/selectTradeList')
}
export let getaddlistzhuanye =() =>{
    return request('/sxpt/label/selectMajorStationList')
}

export let mohu =(params:any) =>{
    return request('/sxpt/project/selectProjectList',{params})
}

export let getarr = () => {
    return request('/sxpt/label/selectMajorStationList')
}

export let updatecode =(param: any) =>{
    console.log(param)
    return request('/sxpt/project',{  method:'POST',data:param})
}

export let getsxtype =(params:Igetsxtype) =>{
    return request('/sxpt/project/selectProjectList',{params})
}
export let deleteitem =(projectVersionId: string) =>{
    return request('/sxpt/project/deleteProjectByVersionId',{
        method: 'DELETE',
        params: {
            projectVersionId
        }
    })
}
export let setdata =(data:any) =>{
    return request('/dev-api/sxpt/project',{method:"POST",data})
}


export let getundo =(projectVersionId: string) =>{
    return request('/sxpt/project/updateProjectStatusCancel',{  method: 'GET',params:{projectVersionId}})
}
export let getaudit =(projectVersionId:string) =>{
    return request('/sxpt/project/updateProjectStatus',{    method: 'GET',params:{projectVersionId}})
}


