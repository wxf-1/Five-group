import {request} from 'umi'
//获取班级
export let getDateClass = () =>{
    return request('/sxpt/interview/interviewRecordRangkingTeacher?');
}