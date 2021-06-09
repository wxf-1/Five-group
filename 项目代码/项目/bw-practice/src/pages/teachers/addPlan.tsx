import React,{useEffect, useState} from 'react'
import styles from './addPlan.less'
import { Form,Input,Button,message, Checkbox,Radio,Select,Cascader,Modal,DatePicker,InputNumber,TreeSelect,Switch, Space} from 'antd';
import {DeleteOutlined,PlusCircleOutlined} from '@ant-design/icons'
import moment from 'moment';
import 'moment/locale/zh-cn';
import {observer} from 'mobx-react-lite'
import locale from 'antd/es/date-picker/locale/zh_CN';
import useStore from '@/context/useStore';
import { IAddClassItem, IPlanClassItem } from '@/utils/interfacePlan';
import { addPlanClassList } from '@/services';
const { RangePicker } = DatePicker;
const AddPlan:React.FC=(props)=>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    //手动分组
  const showModal = () => {
      if(status===0){
        message.error('请选择班级');
        return;
      }
    setIsModalVisible(true);
  };
  //自动分组
  const automaticModal=()=>{
    setIsModalVisible(true);
 
  }
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    let {plan}=useStore()
    const [componentSize, setComponentSize] = useState('default');
    //成员数
    let [membership,setMembership]=useState('成员数')

    //列表
    let [list,setList]=useState<IAddClassItem[]>([])

    //下拉框状态
    let [status,setStatus]=useState(0)

    //分组
    function onChange(value:string) {
        console.log('changed', value);
    }
    function changeMenber(value:string){
        console.log(value,'valueMember');
        
    }
    function disabledDate(current:any) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    //获取班级
    useEffect(() => {
        plan.getPlanClass()
    }, [])
    
    //选中班级 发请求传id
    let subStrUid = function(value:string){
        setStatus(1)
        addPlanClassList(value).then(res=>{
            // console.log(res,'res');
            if(res.code===200){
                setMembership(res.data.length)
                setList(res.data)
            }
        })
    }
    
    //全选
    function checkBox(e:any) {
        
        console.log(`checked = ${e.target.checked}`);
      }
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };
      
      const onFinish=(value:any)=>{
          console.log(value,'value');
        dateFormat(value.time[0]._d)
        dateFormat(value.time[1]._d)
        console.log(value,'value');
        value.time.map((item:any)=>{
            console.log(item,'item');
            
        })
        // console.log(dateFormat(value.time[0]._d),dateFormat(value.time[1]._d),'vsliaf');
      }
      //转换时间格式
      const dateFormat = (dateData: any) => {
        let p=(s:any)=>{
            return s < 10 ? '0' + s : s
        }
        const d = new Date(dateData)
        const resDate = d.getFullYear() + '-' + p((d.getMonth() + 1)) + '-' + p(d.getDate())
        const resTime = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds())
        return resDate+'-'+resTime
    }
    // console.log(dateFormat('Fri Jun 04 2021 00:00:00 GMT+0800 (中国标准时间)'), '+++');
    //console.log(plan.addPlanList,'addlsdfs');
    return <div className={styles.addPlanBox}>
        <div className={styles.planTop}>
            <div className={styles.tops}>
                <span>计划</span>
                <span>/</span>
                <span>添加计划</span>
            </div>
            
        </div>
        <div className={styles.planMid}>
            <div className={styles.planStart}>
                <div className={styles.ys}></div>
                <span>添加计划</span>
            </div>
            <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            onFinish={onFinish}
            initialValues={{ size: componentSize }}
            >
                <div className={styles.antd_box}>
                <div className={styles.antd_big}>
                    <Form.Item label="班级" name='class' className={styles.class}>
                        <Select onChange={(value)=>{subStrUid(value as string)}}  className={styles.select_antd}>
                                {
                                    plan.planLabel.map(item=>{
                                    return <Select.Option key={item.id} value={item.id}  >
                                                {item.classname}
                                            </Select.Option>
                                    })
                                }
                        </Select>
                    </Form.Item>
                    <Form.Item label="成员" className={styles.member} name='member'>
                        <InputNumber  disabled value={membership}  className={styles.inp} defaultValue='成员数' onChange={changeMenber}/>
                    </Form.Item>
                    <Form.Item label="分组" name='grouping' className={styles.grouping}>
                        <InputNumber min={'1'}  max={'10'} defaultValue={'1'} onChange={onChange}    className={styles.inp}/>
                    </Form.Item>
                </div>
                </div>
                <Form.Item label="计划" name='plan' className={styles.plan_Item}>
                    <Input className={styles.select} placeholder='请输入计划'/>
                </Form.Item>
                <Form.Item label="时间" name='time' className={styles.time_Item}>
                {/* <Space direction="vertical" size={12}> */}
                    <RangePicker disabledDate={disabledDate} locale={locale} className={styles.select_time}/>
                    {/* </Space> */}
                </Form.Item>
                {/* <Form.Item >
                    <Button type="primary"  htmlType="submit" >
                        保存
                    </Button>
                </Form.Item> */}
                <div className={styles.fbox}>
                    <Form.Item {...tailLayout} className={styles.fz}>
                        <Button type="primary" className={styles.auto} htmlType="submit" onClick={automaticModal} style={{backgroundColor:'#fff',color:'#000'}}>
                            自动分组
                        </Button>
                        <Button type="primary" className={styles.manual} htmlType="submit" onClick={showModal}>
                            手动分组
                        </Button>
                    </Form.Item>
                </div>
                
                <Modal title="分组" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                okText='确定' cancelText='取消'>
                    <div className={styles.dialog__body}>
                        <div className={styles.group_box}>
                            <div className={styles.group_left}>
                                <div className={styles.group_left_top}>
                                    <span className={styles.left_box}>
                                        <Checkbox onChange={checkBox} className={styles.checkbox}></Checkbox>
                                        <span className={styles.checkbox__label}>全选</span>
                                    </span>
                                    <span>0/10</span> 
                                </div>
                                <div className={styles.group_left_list}>
                                   {
                                       list.map(item=>{
                                           return <div className={styles.checkbox_group} key={item.id}>
                                               <Checkbox className={styles.checkbox}></Checkbox>
                                                <span className={styles.student}>
                                                    <img src={`http://111.203.59.61:8060${item.avatar}`} alt="" style={{width:30,height:30,borderRadius:50}}/>
                                                    <span className={styles.group_left_item_name}>{item.username}</span>
                                                </span>
                                           </div>
                                       })
                                   }
                                </div>
                            </div>
                            <div className={styles.group_right}>
                                <div className={styles.group_num}>当前已分0个小组</div>
                                <div className={styles.group_add_btn}>+创建小组</div>
                                <div className={styles.group_list}>
                                    <div className={styles.group_add_item}>
                                        <div className={styles.group_add_item_tit}>
                                            <PlusCircleOutlined />
                                            <span>组1</span>
                                            <DeleteOutlined />
                                        </div>
                                        <div className={styles.group_add_item_cont}>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
        </Form>   
        </div>
    </div>
}
export default observer(AddPlan)