import useStore from '@/context/useStore';
import { ISkillAddItem } from '@/utils/interface';
import {SendOutlined,SaveOutlined} from '@ant-design/icons'
import {Button, Form, Input, Select, Slider} from 'antd'
import {observer} from 'mobx-react-lite'
import { useEffect } from 'react';
import { IRouteComponentProps } from 'umi';
import addstyles from './addPostSkill.less'
import SkillDescription from '@/components/skillDescription'

const addPostSkill:React.FC<IRouteComponentProps>=({history, location, match})=>{
    let stationVersionId = location.query.stationVersionId
    console.log(location.query.stationVersionId);
    
    let {skill,station} = useStore();
    const [form] = Form.useForm();
    useEffect(() => {
        if (stationVersionId){
            skill.getSkillDetail(stationVersionId as string);
        }
    }, [stationVersionId])

    useEffect(() => {
        // let {majorId, name, stationVersion} = skill.skillAddItem;
        // let {describes, salaryList, stationTask} = skill.skillAddItem.stationLevelList[0];
        form.setFieldsValue({
            ...skill.skillAddItem, ...skill.skillAddItem.stationLevelList[0]
        })
    }, [skill.skillAddItem]);
    
    async function addPostSkill(res: ISkillAddItem){
        console.log(res);
        let stationVersionId = await skill.addPostSkill(res);
        history.replace(`/teachers/addPostSkill?stationVersionId=${stationVersionId}&see=false`)
    }
    async function submit(){
        console.log(stationVersionId);
        
       let a= await skill.getSubmit(stationVersionId as string)
       if (a==true) {
           alert('提交审核成功')
       }
    }
    console.log('skillAddItem...', skill.skillAddItem);
    return <div className={addstyles.AddPost}>
               <section className={addstyles.bnt}>
                    <h3>添加岗位能力</h3>
                    <span>
                        <Button onClick={()=>{history.replace('/teachers/postSkill')}}>返回</Button>
                        <Button type="primary" onClick={()=>submit()} icon={<SendOutlined/>}>提交审核</Button>
                    </span>
                 </section>
            <section className={addstyles.mains}>
                <h3>基本信息</h3>
                <Form form={form} key={JSON.stringify(skill.skillAddItem)} initialValues={{...skill.skillAddItem, ...skill.skillAddItem.stationLevelList[0]}}  onFinish={addPostSkill}>
                    <Button className={addstyles.bcun} type="text" icon={<SaveOutlined />} htmlType="submit">保存</Button>
                    <div className={addstyles.jibenxinxi}>
                        <Form.Item label="岗位名称" name="name" rules={[{required: true, message:"请输入岗位名称"}]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="专业" name="majorId" rules={[{required: true, message:"请选择专业"}]}>
                            <Select className={addstyles.selectmajor}>{
                                    skill.skillLabel.map(item=>{
                                        return <Select.Option value={item.id} key={item.name}>{item.name}</Select.Option>
                                    })
                                }</Select>
                        </Form.Item>
                        <Form.Item label="版本号 V" name="stationVersion" rules={[{required: true, message:"请输入版本号"}]}>
                            <Input type="number"/>
                        </Form.Item>
                        <Form.Item label="作者" name="userName" >
                            <span>郭老师</span>
                        </Form.Item>
                    </div>
                    <div className={addstyles.fom}>
                        <Form.Item label="薪酬范围" name="salaryList" className={addstyles.formitem} rules={[{required: true, message:"请输入薪酬范围"}]}>
                            <Slider range min={0} max={50000} marks={{ 5000:"5K",8000:"8K",20000:"20K",30000:"30K",40000:"40K" }}/>
                        </Form.Item>
                        <Form.Item label="岗位描述" name="describes" className={addstyles.formitem}  rules={[{required: true, message:"请输入岗位描述"}]}>
                            <Input type="textarea" placeholder="请输入岗位描述"></Input>
                        </Form.Item>
                        <Form.Item label="岗位任务" name="stationTask" className={addstyles.formitem}  >
                            <Input type="textarea" placeholder="请输入岗位任务"></Input>
                        </Form.Item>
                    </div>
                </Form>
            </section>
            <section>
                {
                    stationVersionId?<SkillDescription stationVersionId={stationVersionId as string}                  />
                    : null
                }
            </section>
    </div>
}
export default observer(addPostSkill)