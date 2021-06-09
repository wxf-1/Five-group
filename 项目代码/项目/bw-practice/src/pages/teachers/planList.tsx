import React, { useEffect, useState } from 'react'
import planstyles from './planList.less'
import {NavLink} from 'umi'
import useStore from '../../context/useStore'
import { IPlanClassItem, IPlanItem, IPlanListItem } from '@/utils/interfacePlan'
import { Button,Input,Table, Modal,message } from 'antd';
import { SearchOutlined,DeleteOutlined,EyeOutlined} from '@ant-design/icons';
import classnames from 'classnames'
import { delPlanItem, getPlanList } from '@/services';
import {observer} from 'mobx-react-lite'
const status=['未开始','进行中','已结束']
const PlanList:React.FC=(props)=>{
    let {plan}=useStore()
    //班级
    let [curPlan,setCurPlan]=useState('')
    //状态
    let [curStatus,setCurStatus]=useState(1)
    
    //班级列表传入参数
    let planClassList={pageNum: 1,pageSize: 10}
    //列表
    let [dataSource,setDataSource]=useState<IPlanListItem[]>([])
    //输入框默认值
    let [title,setTitle]=useState('')
    //搜索
    let [searchName,setSearchName]=useState('')
    //删除
    const [visible, setVisible] = useState(false);
    //点击删除传的id
    let [delid,setDelid] =useState('')
  //点击删除按钮 显示弹框
  const showModal = (id:string) => {
    setVisible(true);
    setDelid(id)
  };
  
  //确定 删除
  const hideModal = () => {
      //关闭弹框
    setVisible(false);
    // console.log(delid,'delid');
    
    //删除接口传id
    delPlanItem(delid).then(res=>{
        // console.log(res,'res');
        if(res.code===200){
            message.info(res.msg);
        }
    })
    //重新请求列表  渲染页面
    let planClassList:IPlanItem={ifFinished: curStatus,classId:curPlan,searchName,pageNum: 1,pageSize: 10,}
    getPlanList(planClassList).then((res:any)=>{
        // console.log(res,'qqqqqesdfsresqqqqqqqqq');
        console.log(res);
        if(res.code==200){
            setDataSource(res.rows)
        }
    })
  };
  //取消删除
  const calccelModal = () => {
    setVisible(false);
  };
  //取消x 关闭弹框
  const handleCancel = () => {
    setVisible(false);
  };
  const columns:any = [
    {
      title: '班级/计划',
      
    //   dataIndex: 'className',
      render:(row:IPlanListItem)=>{
            return <div className={planstyles.tdclass}>
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
     
    //   dataIndex: 'surplusTime',
      render:(row:IPlanListItem)=>{
          if(curStatus!==2){
             return <div className={planstyles.tdtime}>
                        <div className={planstyles.timeEnd}>
                            <div className={planstyles.timeStart}>
                                <span className={planstyles.end_times}>距结束还剩:</span>
                                <span className={planstyles.end_detail}>{row.surplusTime}</span>
                            </div>
                            <div className={planstyles.timeStart}>
                                <span className={planstyles.end_time}>开始:</span>
                                <span className={planstyles.end}>{row.begintime}</span>
                            </div>
                            <div className={planstyles.timeStart}>
                                <span className={planstyles.end_time}>结束:</span>
                                <span className={planstyles.end}>{row.endtime}</span>
                            </div>
                        </div>
                    </div> 
          }else{
            return <div className={planstyles.tdtime}>
                    <div className={planstyles.timeEnd}>
                         <div className={planstyles.timeStart}>
                            <span className={planstyles.end_times}>距结束还剩:</span>
                            <span className={planstyles.end_detail}>0时0分0秒</span>
                        </div>
                        <div className={planstyles.timeStart}>
                            <span className={planstyles.end_time}>开始:</span>
                            <span className={planstyles.end}>{row.begintime}</span>
                        </div>
                        <div className={planstyles.timeStart}>
                            <span className={planstyles.end_time}>结束:</span>
                            <span className={planstyles.end}>{row.endtime}</span>
                        </div>
                    </div>
            </div> 
          }
          
      },
      align:'center',
    },
    {
        title: '进度',
    //   dataIndex: 'progress',
        render:(row:IPlanListItem)=>{
            if(row.progress==='0'){
                return <div  className={planstyles.pro}>
                            <div>
                                <span style={{color:'#ccc',fontSize:'24px'}}>{row.progress}%</span>
                            </div>
                     </div>
            }else if(row.progress!=='0'){
                return <div  className={planstyles.pro}>
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
        render:(row:IPlanListItem)=>{
            return <div  className={planstyles.cz}>
                        <div>
                        <NavLink to={`/teachers/viewPlan?plan_id=${row.id}&class_id=${row.classid}`}>
                            <EyeOutlined style={{ color: '#679cf6' }} />
                        </NavLink>
                            <DeleteOutlined  onClick={()=>{showModal(row.id)}} style={{ color: '#679cf6' }}/>
                        </div>
                        <Modal title="提示"
                            visible={visible}
                            onOk={()=>{hideModal()}}
                            onCancel={calccelModal}
                            okText="确认"
                            cancelText="取消">
                            <p>确定要删除该岗位吗?</p>
                        </Modal>
            </div>
        },
        align:'center',
    },
  ];
  
    
    //头部班级
    useEffect(() => {
        plan.getPlanClass()
    }, [])
    //班级列表
    useEffect(() => {
        let planClassList:IPlanItem={} as IPlanItem
        if(curStatus){
            planClassList={...planClassList,
                ifFinished: curStatus,
                classId:curPlan,
                searchName,
            }
        }else{
            planClassList={...planClassList,
                ifFinished: 0,
                classId:curPlan,
                searchName,
            }
        }
        getPlanList(planClassList).then((res: { code: number; rows: React.SetStateAction<IPlanListItem[]> })=>{
            // console.log(res,'qqqqqesdfsresqqqqqqqqq');
            if(res.code==200){
                setDataSource(res.rows)
                // console.log(dataSource);
            }
        })
    }, [curPlan,curStatus,searchName])
    return <div className={planstyles.bigBox}>
        <div className={planstyles.head}>
            <div  className={planstyles.span1}>
                <span>计划</span>
                <span>/</span>
                <span className={planstyles.span2}>计划管理</span>
            </div>
            
        </div>
        <div className={planstyles.fatherBox}>
            <section className={planstyles.topBox}>
                <span className={planstyles.classBox}>班级:</span>
                <div className={planstyles.ulBox}>
                    {
                        [{id:'',classname:'全部'},...plan.planLabel].map(item=>{
                            return <span key={item.id}
                            className={item.id===curPlan?classnames(planstyles.active,planstyles.spans):planstyles.spans}
                            onClick={e=>setCurPlan(item.id)}>{item.classname}</span>
                        })
                    }
                </div>
            </section>
            <div className={planstyles.midBox}>
                    <div className={planstyles.statusBox}>
                        <div className={planstyles.left}>
                            {
                                status.map((item,index)=>{
                                    return <span key={index}
                                    onClick={e=>setCurStatus(index)}
                                    className={index===curStatus?classnames(planstyles.spanBox,planstyles.act):planstyles.spanBox}>{item}</span>
                                })
                            }
                        </div>
                        <div className={planstyles.right}>
                            <NavLink to='/teachers/addPlan'>
                            <Button type="primary" className={planstyles.plans}>+添加计划</Button>
                            </NavLink>
                            
                            <div className={planstyles.search}>
                                <input placeholder="搜索计划/项目/任务"  className={planstyles.inp}
                                value={title}
                                onChange={e=>setTitle(e.target.value)}
                                onKeyDown={e=>{
                                    if(e.keyCode===13){
                                        setSearchName(title)
                                    }
                                }}/>
                                {<SearchOutlined onClick={e=>setSearchName(title)}/>}
                            </div>
                        </div>
                    </div>
                    <Table dataSource={dataSource} rowKey='id'  columns={columns}/>
            </div>
        </div>
    </div>
    
}

export default observer(PlanList)