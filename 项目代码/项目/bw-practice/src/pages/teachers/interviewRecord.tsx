import useStore from "@/context/useStore";
import { interfaceList } from "@/utils/interfaceView"
import React, { useEffect, useState } from "react"
import { IRouteComponentProps } from "umi";
import {Button} from 'antd'
import './interviewRecord.less'
const status=['不确定','通过','没通过']
const interviewRecord:React.FC<IRouteComponentProps>=(props)=>{
    
    const {interview}=useStore()
    let [data,setData]=useState<interfaceList []>([])
    const [flag,setFlag]=useState<boolean>(false)
    useEffect(() => {
        console.log(props.location.query);
        interview.getDetailto(props.location.query).then(res=>{
            console.log(res);
            setData(res)
        })
    }, [])
    console.log(data);
    return <div className='interviewDetail'>
        {
            flag ? <div className='mask'>
                       <img src="http://111.203.59.61:8060//static/img/shield.69691644.svg" alt="" />
                </div>
            :null
        }
        <div className='content'>
                <div className='top'>
                    <h4>查看面试记录</h4>
                    <div>
                        <Button type='primary' size='large' onClick={()=>{
                            props.history.push('/teachers/interviewManage')
                        }}>返回</Button>
                        <Button size='large' onClick={()=> setFlag(!flag) } > {!flag ?'屏蔽':"取消屏蔽"} </Button>
                    </div>
                </div>
            <div className={flag ? 'content-cent cent-active' :'content-cent' }>
                <div className='item'>
                     <p>岗位名称 &nbsp; <span className='spanitem'> {interview.detail.stationName}  </span> </p>  
                     <p>公司名称 &nbsp;  <span className='spanitem'>  {interview.detail.companyName} </span></p>
                </div>
                <div className='item'>
                     <p>面试时间 &nbsp;  <span className='spanitem'> {interview.detail.interviewTime} </span> </p>
                     <p>时长 &nbsp;  <span className='spanitem'>  {interview.detail.duration} </span> </p>
                </div>
                <div className='item'>
                    <p>地点 &nbsp;  <span className='spanitem'>  {interview.detail.site}  </span></p>
                    <p>面试官 &nbsp;  <span className='spanitem'>  {interview.detail.intervierManagement} </span> </p>
                </div>
                <div className='item'>
                    <p>专业 &nbsp;  <span className='spanitem'>   {interview.detail.majorName} </span> </p>
                    <p>提交人 &nbsp;  <span className='spanitem'>  {interview.detail.commitName}  </span> </p>
                </div>
                <div className='item'>
                    记录-吐槽 &nbsp;  <span className='spanitem'>  {interview.detail.record}</span>
                </div>
                <div className='item'>
                    面试结果 &nbsp;  <span className='spanitem'> {status[interview.detail.status]}</span>
                </div>
                <div className='item'>
                    录音文件 &nbsp;   <span className='spanitem'>  {interview.detail.issoundrecord ?'有':'无'}</span>
                </div>
                <div className='item'>
                    面试问题 &nbsp;  <span className='spanitem1'>  请如实填写面试问题和答案，面试中没有作答的题目可略过答案填写，直接输入问题即可。</span>
                </div>
                {
                    data ? <div className='itemwenda'>
                        <p> <span className='ask_title'>问</span>  { data.question} </p>
                        <p> <span className='answer_detail'>答</span>  {data.answer} </p>
                    </div> 
                     :""
                }
            </div>
        </div>
    </div>
}
export default interviewRecord