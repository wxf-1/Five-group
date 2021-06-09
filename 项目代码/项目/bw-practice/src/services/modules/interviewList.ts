import {request} from 'umi'
import {Ifuzzy} from '../../utils/interviewList'
//获取导航
export let getDatazhh = () =>{
    return request('/sxpt/station/selectStationLabel');
} 
//获取下面的岗位列表
export let getSkillList = () =>{
    return request('/sypt/interview/interviewList');
}
//获取模糊搜索
export let getFuzzy = (params:Ifuzzy) =>{
    return request('/sypt/interview/interviewList',{
        params
    });
}
export let getSkillData = (params:any) =>{
    return request('/sypt/interview/interviewList',{
        params
    })
}

//状态
export let getState = (searchTitle:string,status: number,pageNum: number,pageSize: number) =>{
    return request('/sypt/interview/interviewList',{
      searchTitle,status,pageNum,pageSize
    });
}