import useStore from '@/context/useStore'
import { useEffect, useState } from 'react'
import {Table} from 'antd'
import classnames from 'classnames'
import { EyeOutlined} from '@ant-design/icons';

import pstyles from './planListManage.less'
import { IPlanManage, IPlanManageList } from '@/utils/interfacePlan'
import { getPlanListManage } from '@/services'
import { NavLink } from 'umi';
const status=['未开始','进行中','已结束']

const PlanListManage:React.FC=(props)=>{
    //状态
    let [listStatus,setListStatus]=useState(1)
    //tab列表
    let [dataSource,setDataSource]=useState<IPlanManage[]>([])
    let {plan}=useStore()
    //列表传入字段
    let planManageList={pageNum: 1, pageSize: 10}
    const columns = [
        {
          title: '班级/计划',
          render:(row:IPlanManageList)=>{
            return <div className={pstyles.tdclass}>
                <div>
                    <div>{row.className}</div>
                    <div>{row.planname}</div>
                </div>
            </div>
          },
          align:'center',
        },
        {
          title: '时间',
          render:(row:IPlanManageList)=>{
              if(listStatus!==2){
                  return <div className={pstyles.tdtime}>
                    <div className={pstyles.timeEnd}>
                        <div className={pstyles.timeStart}>
                            <span className={pstyles.end_time}>距结束还剩:</span>
                            <span className={pstyles.end_detail}>{row.surplusTime}</span>
                        </div>
                        <div className={pstyles.timeStart}>
                            <span className={pstyles.end_time}>开始:</span>
                            <span className={pstyles.end}>{row.begintime}</span>
                        </div>
                        <div className={pstyles.timeStart}>
                            <span className={pstyles.end_time}>结束:</span>
                            <span className={pstyles.end}>{row.endtime}</span>
                        </div>
                    </div>
                </div>
            }else{
                return <div className={pstyles.tdtime}>
                    <div className={pstyles.timeEnd}>
                        <div className={pstyles.timeStart}>
                            <span className={pstyles.end_time}>距结束还剩:</span>
                            <span className={pstyles.end_detail}>0时0分0秒</span>
                        </div>
                        <div className={pstyles.timeStart}>
                            <span className={pstyles.end_time}>开始:</span>
                            <span className={pstyles.end}>{row.begintime}</span>
                        </div>
                        <div className={pstyles.timeStart}>
                            <span className={pstyles.end_time}>结束:</span>
                            <span className={pstyles.end}>{row.endtime}</span>
                        </div>
                    </div>
                </div>
            }
              
          },
          align:'center',
        },
        {
          title: '进度',
            render:(row:IPlanManageList)=>{
                if(row.progress==='0'){
                    return <div  className={pstyles.pro}>
                    <div>
                        <span style={{color:'#ccc',fontSize:'24px'}}>{row.progress}%</span>
                    </div>
                </div>
                }else if(row.progress!=='0'){
                    return <div  className={pstyles.pro}>
                        <div>
                            <span style={{color:'#ffa841',fontSize:'24px'}}>{row.progress}%</span>
                        </div>
                    </div>
                }
                
            },
          align:'center',
        },
        {
            title: '操作',
            render:(row:IPlanManageList)=>{
                return <div  className={pstyles.cz}>
                    <div>
                        
                       <NavLink to={`/teachers/viewPlanManage?plan_id=${row.id}&class_id=${row.classid}`}> <EyeOutlined style={{ color: '#679cf6' }}/></NavLink>
                    </div>
                </div>
            },
            align:'center',
          },
      ];
    useEffect(() => {
        let planManageList:IPlanManage={} as IPlanManage
        if(listStatus){
            planManageList={...planManageList,ifFinished:listStatus,searchName:'',classId:''}
        }else{
            planManageList={...planManageList,ifFinished:0,searchName:'',classId:''}
        }
        getPlanListManage(planManageList).then(res=>{
            // console.log('resdg....',res);
            setDataSource(res.rows)

        })
    }, [listStatus])
    // console.log(dataSource,'daafs');

    return <div className={pstyles.teacher_pages}>
        <div className={pstyles.teacher_body}>
            <div className={pstyles.breadcrumb_box}>
                <div  className={pstyles.breadcrumb_list}>
                    <span>计划</span>
                    <span>/</span>
                    <span className={pstyles.Breadcrumb}>计划管理</span>
                </div>
            </div>
            <div className={pstyles.teacher_plan_list}>
                <div className={pstyles.plan_left}>
                    <div className={pstyles.input_tab}>
                            {
                                status.map((item,index)=>{
                                    return <span key={index}
                                    onClick={()=>setListStatus(index)}
                                    className={index===listStatus?classnames(pstyles.spanBox,pstyles.act):pstyles.spanBox}>{item}</span>
                                })
                            }
                    </div>
                    <div className={pstyles.table_detail}>
                        <Table  dataSource={dataSource} columns={columns as any}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default PlanListManage

