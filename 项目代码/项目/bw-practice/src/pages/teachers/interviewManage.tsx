import React, { useEffect, useState } from "react"
import { Breadcrumb,Input,Switch,Table} from 'antd'
import useStore from "@/context/useStore"
import { interfaceList } from "@/utils/interfaceView";
import { observer } from "mobx-react-lite";
import './interviewManage.less'
import interview from "@/store/modules/interview";
import { Link } from "react-router-dom";
  function tiao(rows:interfaceList){
      interview.getDetailto(rows.interviewId)
  }
  const columns = [
    {
      title: '岗位名称',
      // dataIndex: 'stationName',
      render:(rows:interfaceList)=>{
        return <Link to={`/teachers/interviewRecord?interviewId=${rows.interviewId}&shield=${Boolean(rows.shield)}&see=true`} onClick={()=>tiao(rows)}> {rows.stationName} </Link>
       }
    },  
    {
      title: '公司名称',
      dataIndex: 'companyName',
    },
    {
      title: '面试时间',
      dataIndex: 'interviewTime',
    },
    {
      title: '面试官',
      dataIndex: 'intervierManagement',
    },
    {
      title: '专业',
      dataIndex: 'majorName',
    },
    {
      title: '提交人',
      dataIndex: 'commitName',
    },
    {
      title: '面试结果',  
      // dataIndex:'status',
      render:(rows:interfaceList)=>{
          if (rows.status==0) {
             return <span className='uncertain'>不确定</span>
          }else if (rows.status==1) {
            return <span className='pass'>通过</span>
          }else if (rows.status==2) {
            return <span className='nopass'>没通过</span>
          }
      }
    },
    {
      title: '录音文件',
      // dataIndex:'issoundrecord'
      render:(rows:interfaceList)=>{
          return <span> {rows.issoundrecord==0?'无':'有'} </span>
      }
    },
    {
      title: '屏蔽',
      // dataIndex: 'shield',
      render:(rows:interfaceList)=>{
         return <Switch defaultChecked={Boolean(rows.shield)} onClick={()=>onChange(rows)} />
      }
    }
  ];
   function onChange(rows:interfaceList) {
    if (rows.shield==0) {
        rows.shield=1
         interview.deleteinterview(rows.interviewId,1)
    }else{
         interview.deleteinterview(rows.interviewId,0)
    }
}
const interviewManage:React.FC<interfaceList>=(props)=>{
    const {interview}=useStore()
    useEffect(() => {
      interview.interviewManage()
    }, [])
    function changevalue(e:any){
        interview.getInterview(e.target.value)
    }
    return <div className='interviewManage'>
             <Breadcrumb>
                <Breadcrumb.Item>面试</Breadcrumb.Item>
                <Breadcrumb.Item>
                <a href="">面试记录管理</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Input placeholder="搜索岗位/公司名称" onKeyDown={(e)=>{
              if (e.keyCode==13) {
                 changevalue(e)
              }
            }}/>
            <Table rowKey="interviewId" dataSource={interview.inlist} columns={columns} />;
    </div>
}
export default observer(interviewManage)

