/*
 * @Author: Yuanshuqin 
 * @Date: 2021-05-31 15:34:18 
 * @Last Modified by: Yuanshuqin
 * @Last Modified time: 2021-06-05 08:56:14
 */
import React, { FC, useState, useEffect } from 'react'
import { Button, Form, Input, DatePicker, Space, Select, Tree } from 'antd'
import AddDefenceStyle from './addDefence.less'
import { SaveOutlined } from '@ant-design/icons'
import useStore from '@/context/useStore'
import { getClasssPlanTree } from '@/services'
import moment from 'moment';
import 'moment/locale/zh-cn';
import {IRouteComponentProps} from 'umi'
import locale from 'antd/es/date-picker/locale/zh_CN';
import { ClasssPlanTree } from '@/utils/interfacePrac'
const { RangePicker } = DatePicker;
function range(start: any, end: any) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

function disabledDate(current: any) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

function disabledRangeTime(_: any, type: any) {
    if (type === 'start') {
        return {
            disabledHours: () => range(0, 60).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }
}
const AddDefence: FC<IRouteComponentProps> = ({history,location,match}) => {
    let { skill,defence } = useStore();
    let [classsPlanTree, setClasssPlanTree] = useState<any>({});
    let [defenceCreateTime,setDefenceCreateTime]=useState('');
    let [defenceEndTime,setDefenceEndTime]=useState('');
    useEffect(() => {
        getClasssPlanTree().then((res: { data: any[] }) => {
            console.log(res, 'res');
            setClasssPlanTree(res.data[0])
        })

    }, [])
    const onFinish = (values: any) => {
        console.log('Success:', values);
        console.log(dateFormat(values.time[0]._d),'time');
        setDefenceCreateTime(dateFormat(values.time[0]._d));
        setDefenceEndTime(dateFormat(values.time[1]._d));
        let res = defence.getAddDefence({
            classplan:['9','dac5dab61f434d889c005a6dd2ab6b3d'],
            defenceAdress:values.defenceAdress,
            defenceAuthorName:'郭老师',
            defenceClassId:'9',
            defenceCreateTime:dateFormat(values.time[0]._d),
            defenceEndTime:dateFormat(values.time[1]._d),
            defenceId:'',
            defenceMajorId:values.majorName,
            defencePlanId:'dac5dab61f434d889c005a6dd2ab6b3d',
            defenceScore:'',
            degenceName:values.degenceName,
            majorList:'',
            time:[dateFormat(values.time[0]._d),dateFormat(values.time[1]._d)]
        })
        history.replace(`/teachers/addDefence?defenceId=?`)
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    // 转换时间格式
    const dateFormat = (dateData: any) => {
        let p=(s:any)=>{
            return s < 10 ? '0' + s : s
        }
        const d = new Date(dateData)
        const resDate = d.getFullYear() + '-' + p((d.getMonth() + 1)) + '-' + p(d.getDate())
        const resTime = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds())
        return resDate+' '+resTime
    }
    // const treeData = [
    //     {
    //         title: classsPlanTree.label,
    //         key: classsPlanTree.value,
    //         children: [
    //             {
    //                 title: 'aa',
    //                 key: '0-0-1'
    //             },
    //             {
    //                 title: '5.10下午任务',
    //                 key: '0-0-2'
    //             },
    //             {
    //                 title: '5.10实训计划',
    //                 key: '0-0-3'
    //             },{
    //                 title: '5.8实训计划',
    //                 key: '0-0-4'
    //             },
    //         ],
    //     },
    // ];
    return (
        <div className={AddDefenceStyle.AddDefence}>
            {/* <header className={AddDefenceStyle.header}>
                <a href="#">答辩</a>/<a href='#'>发起答辩</a>
            </header> */}
            <section className={AddDefenceStyle.main}>
                <ul className={AddDefenceStyle.mainTop}>
                    <li>发起答辩</li>
                    <li>
                        <Button>返回</Button>
                        <Button type="primary">提交</Button>
                    </li>
                </ul>
                <Form
                    name="basic"
                    // initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item>
                        <Button icon={<SaveOutlined />} htmlType="submit">保存</Button>
                    </Form.Item>
                    <section>
                        <Form.Item
                            label="答辩名称"
                            name="degenceName"
                            rules={[{ required: true, message: '请输入答辩名称' }]}
                        >
                            <Input placeholder='请输入答辩名称' />
                        </Form.Item>
                        <Form.Item
                            label="专业"
                            name="majorName"
                            rules={[{ required: true, message: '请选择专业' }]}
                        >
                            <Select defaultValue="请选择专业" style={{ width: 260 }} allowClear>
                                {
                                    skill.skillLabel && skill.skillLabel.map(item => {
                                        return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </section>
                    <Form.Item
                        label="答辩时间"
                        name="time"
                        rules={[{ required: true, message: '请选择日期' }]}
                    >
                        {/* <Space direction="vertical" size={12}> */}
                        <RangePicker
                            disabledDate={disabledDate}
                            disabledTime={disabledRangeTime as any}
                            locale={locale}
                            showTime={{
                                hideDisabledOptions: true,
                                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                            }}
                            format="YYYY-MM-DD HH:mm:ss"
                        />
                        {/* </Space> */}
                    </Form.Item>
                    <section>
                        <Form.Item
                            label="班级/计划"
                            name="className"
                            rules={[{ required: true, message: '请选择班级/计划' }]}
                        >
                            {/* <Tree
                                defaultExpandedKeys={['0-0-0', '0-0-1']}
                                defaultSelectedKeys={['0-0-0', '0-0-1']}
                                defaultCheckedKeys={['0-0-0', '0-0-1']}
                                onSelect={onSelect}
                                onCheck={onCheck}
                                treeData={treeData}
                            /> */}
                            <Select style={{ width: 200 }} allowClear>
                                <Select.Option key={classsPlanTree.value} value={classsPlanTree.label}>{classsPlanTree.label}</Select.Option>
                            </Select>
                            {/* <Input defaultValue={classsPlanTree.label}/> */}
                        </Form.Item>
                        <Form.Item
                            label="答辩地址"
                            name="defenceAdress"
                            rules={[{ required: true, message: '请输入答辩地址' }]}
                        >
                            <Input placeholder='请输入地址' />
                        </Form.Item>
                    </section>
                    <Form.Item
                        label="发起人"
                        name="defenceAuthorName"

                    // rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <span>郭老师</span>
                    </Form.Item>
                </Form>
            </section>
        </div>
    )
}

export default AddDefence;