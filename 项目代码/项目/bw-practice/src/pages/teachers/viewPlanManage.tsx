import useStore from '@/context/useStore'
import styles from './viewPlanManage.less'
import {IRouteComponentProps} from 'umi'
import { Input, Menu, Dropdown, Progress, Select, Table, Tag, Space } from 'antd'
import { useEffect, useState } from 'react';
import { IListItem, IPlanManageRank, IProgressItem } from '@/utils/interfacePlan';
import { DownOutlined, TeamOutlined, CheckCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import {observer} from 'mobx-react-lite'
const { Option } = Select;
const ViewPlanManage:React.FC<IRouteComponentProps>=(props)=>{
    // console.log(props.location.query);
    //接收id
    let {class_id,plan_id}=props.location.query
    // //班级
    // let [progress,setProgress]=useState<IProgressItem>({})
    // //班级排行
    // let [classRank,setClassRank]=useState<IPlanManageRank>({})

    let {plan}=useStore()
    useEffect(() => {
        plan.getViewPlanClass(class_id as string,plan_id as string)
        plan.getViewPlanRank(class_id as string,plan_id as string)
        // setProgress(plan.getClassProgress)
        // setClassRank(plan.getClassRank)
        // console.log(progress,classRank,'odjgsd');
        
    }, [])
    const columns = [
        {
            title: '姓名',
            dataIndex: 'username',
            
        }
      ];
    return<div className={styles.box}>
        <header className={styles.header}>
            <span>计划</span>
            <span>/</span>
            <span className={styles.span2}>计划管理</span>
        </header>
    <section className={styles.mainTop}>
        <ul>
            <li>
                <p>{plan.getClassProgress.className}</p>
                <p>{plan.getClassProgress.planname}</p>
                <p>{plan.getClassProgress.begintime}~{plan.getClassProgress.endtime}</p>
            </li>
        </ul>
        <div className={styles.class}>
            <div>
                <span>{plan.getClassProgress.countStus }</span>
                <span>总人数</span>
            </div>
            <div>
                <span>{plan.getClassProgress.progress}%</span>
                <span>完成率</span>
            </div>
            <div>
                <span>{plan.getClassProgress.countCompleted?plan.getClassProgress.countCompleted:0}</span>
                <span>按期完成人数</span>
            </div>
            <div>
                <span>{plan.getClassProgress.countUncompleted }</span>
                <span>延期未完成人数</span>
            </div>
        </div>
    </section>
    <section className={styles.wrap}>
        <div className={styles.wrapLeft}>
            {
                plan.getClassProgress.list && plan.getClassProgress.list.map((item:IListItem, index:number) => {
                    return (
                        <div className={styles.wrapLeftItem} key={index}>
                            <p>{item.groupname}</p>
                            <p>完成{item.groupProgress}%</p>
                            <Progress percent={Number(item.groupProgress)} showInfo={false} strokeColor='rgb(255, 168, 65)' />
                            <ul className={styles.uls}>
                                <li className={styles.list}><span><TeamOutlined style={{ color: '#679cf6', fontSize: 16 }} /></span><span>人员</span><span>{item.members}</span></li>
                                <li className={styles.list}><span><CheckCircleOutlined style={{ color: '#679cf6', fontSize: 16 }} /></span><span>按期完成</span><span>{item.finished}</span></li>
                                <li className={styles.list}><span><HistoryOutlined style={{ color: '#679cf6', fontSize: 16 }} /></span><span>延期未完成</span><span>{item.unfinished}</span></li>
                            </ul>
                            <div className={styles.wrapLeftItemStatus}>
                                <div><i></i><span>完成</span></div>
                                <div><i></i><span>进行中</span></div>
                                <div><i></i><span>未进行</span></div>
                            </div>
                             <Table rowKey={item.id} columns={columns} dataSource={item.stuList} /> 

                        </div>
                    )
                })
            }


        </div>
        <div className={styles.wrapRight}>
            <h3>班级排行榜</h3>
            {
               plan.getClassRank &&plan.getClassRank.map((item, index) => {
                    return (
                        <div className={styles.classRankItem} key={index}>
                            <h4 className={styles.topCount}>{index+1}</h4>
                            <img src={`http://111.203.59.61:8060${item.studentUrl}`} className={styles.plan_img}/>
                            <div  className={styles.plan_list}>
                                <p>{item.username}</p>
                                <p>{item.groupname}</p>
                            </div>
                            <p className={styles.plan_pro}>{(item.taskCompletedpProgress as number) * 100}%</p>
                        </div>
                    )
                })
            }
        </div>
    </section>
</div>
}
export default observer(ViewPlanManage)