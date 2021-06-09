/*
 * @Author: Yuanshuqin 
 * @Date: 2021-05-31 15:36:02 
 * @Last Modified by: Yuanshuqin
 * @Last Modified time: 2021-06-01 21:03:22
 */
import React, { useState, useEffect } from 'react'
import { ClassRankItem, SelectClassPlan, SelectClassPlanInit } from '@/utils/interfacePrac'
import { observer } from 'mobx-react-lite'
import useStore from '@/context/useStore'
import viewPlanStyle from './viewPlan.less'
import {IRouteComponentProps} from 'umi'
import { Input, Menu, Dropdown, Progress, Select, Table, Tag, Space } from 'antd'
const { Option } = Select;
import { DownOutlined, TeamOutlined, CheckCircleOutlined, HistoryOutlined } from '@ant-design/icons';
const columns = [
    {
        title: '姓名',
        dataIndex: 'username'
    }
];
const ViewPlan: React.FC<IRouteComponentProps> = (props) => {
    let { viewPlan } = useStore();
    let [classid, setClassId] = useState('');
    let [classPlanid, setClassPlanid] = useState('')
    let [planDetail, setPlanDetail] = useState<SelectClassPlanInit>({})
    let [classRank, setClassRank] = useState<ClassRankItem[]>([])
    let {plan_id,class_id}=props.location.query
    useEffect(() => {
        viewPlan.getSelectClassPlanList();
        viewPlan.getSelectClassPlanInit(class_id as any,plan_id as any);
        viewPlan.getClassRankList(class_id as any,plan_id as any);
        // setPlanDetail(viewPlan.selectClassPlanDetail)
    }, [])
    // console.log(planDetail,'planskfe');
    
    function changePage(value:string){
        let result = viewPlan.selectClassPlanList.filter(item => item.id == value);
            // console.log(planDetail[0].classid,planDetail[0].id,planDetail,'detail');
            setClassId(result[0].classid);
            setClassPlanid(result[0].id);
    }
    useEffect(()=>{
        if(classPlanid){
            viewPlan.getSelectClassPlanInit(classid,classPlanid);
            viewPlan.getClassRankList(classid,classPlanid);
            // setClassRank(viewPlan.classRankList)
        }
    },[classid,classPlanid])
    console.log(viewPlan.selectClassPlanDetail,'defihaifsa');
    
    return (
        <div className={viewPlanStyle.viewPlan}>
            {/* <header className={viewPlanStyle.header}>
                <a href="#">答辩</a>/<a href='#'>答辩管理</a>
            </header> */}
            <section className={viewPlanStyle.mainTop}>
                <ul>
                    <li>
                        <p>{viewPlan.selectClassPlanDetail.className}</p>
                        <p>{viewPlan.selectClassPlanDetail.planname}</p>
                        <p>{viewPlan.selectClassPlanDetail.begintime}~{viewPlan.selectClassPlanDetail.endtime}</p>
                    </li>
                    <Select defaultValue="请选择" className={viewPlanStyle.ant_select} style={{ width: 260,color:'#000' }} allowClear 
                        onChange={(value) => {changePage(value)}}>
                
                        {
                            viewPlan.selectClassPlanList && viewPlan.selectClassPlanList.map((item, index) => {
                                return <Option className={viewPlanStyle.selects} key={item.id} 
                                style={{color:'#000'}}
                                value={item.id}>{item.planname}</Option>
                            })
                        }
                    </Select>
                </ul>
                <div className={viewPlanStyle.class}>
                    <div>
                        <span>{viewPlan.selectClassPlanDetail.countStus }</span>
                        <span>总人数</span>
                    </div>
                    <div>
                        <span>{viewPlan.selectClassPlanDetail.progress}%</span>
                        <span>完成率</span>
                    </div>
                    <div>
                        <span>{viewPlan.selectClassPlanDetail.countCompleted?viewPlan.selectClassPlanDetail.countCompleted:0}</span>
                        <span>按期完成人数</span>
                    </div>
                    <div>
                        <span>{viewPlan.selectClassPlanDetail.countUncompleted }</span>
                        <span>延期未完成人数</span>
                    </div>
                </div>
            </section>
            <section className={viewPlanStyle.wrap}>
                <div className={viewPlanStyle.wrapLeft}>
                    {
                        viewPlan.selectClassPlanDetail.list && viewPlan.selectClassPlanDetail.list.map((item, index) => {
                            return (
                                <div className={viewPlanStyle.wrapLeftItem}>
                                    <p>{item.groupname}</p>
                                    <p>完成{item.groupProgress}%</p>
                                    <Progress percent={Number(item.groupProgress)} showInfo={false} strokeColor='rgb(255, 168, 65)' />
                                    <ul>
                                        <li><span><TeamOutlined style={{ color: '#679cf6', fontSize: 16 }} /></span><span>人员</span><span>{item.members}</span></li>
                                        <li><span><CheckCircleOutlined style={{ color: '#679cf6', fontSize: 16 }} /></span><span>按期完成</span><span>{item.finished}</span></li>
                                        <li><span><HistoryOutlined style={{ color: '#679cf6', fontSize: 16 }} /></span><span>延期未完成</span><span>{item.unfinished}</span></li>
                                    </ul>
                                    <div className={viewPlanStyle.wrapLeftItemStatus}>
                                        <div><i></i><span>完成</span></div>
                                        <div><i></i><span>进行中</span></div>
                                        <div><i></i><span>未进行</span></div>
                                    </div>
                                    <Table rowKey={item.id} columns={columns} dataSource={item.stuList} pagination={false} />
                                </div>
                            )
                        })
                    }


                </div>
                <div className={viewPlanStyle.wrapRight}>
                    <h3>班级排行榜</h3>
                    {/* <p className={viewPlanStyle.topOne}>TOP.1</p>
                    <p className={viewPlanStyle.topTwo}>TOP.2</p>
                    <p className={viewPlanStyle.topThree}>TOP.3</p> */}
                    {
                        viewPlan.classRankList && viewPlan.classRankList.map((item, index) => {
                            return (
                                <div className={viewPlanStyle.classRankItem}>
                                    <h4 className={viewPlanStyle.topCount}>{index+1}</h4>
                                    <ul>
                                        <li><img src={`http://111.203.59.61:8060${item.studentUrl}`} /></li>
                                        <li>
                                            <p>{item.username}</p>
                                            <p>{item.groupname}</p>
                                        </li>
                                    </ul>
                                    <p>{item.taskCompletedpProgress * 100}%</p>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}

export default observer(ViewPlan);