/*
 * @Author: Yuanshuqin 
 * @Date: 2021-05-31 15:35:39 
 * @Last Modified by: Yuanshuqin
 * @Last Modified time: 2021-06-01 21:02:15
 */
import React, { useState, useEffect } from 'react'
import defenceStyle from './defence.less'
import useStore from '@/context/useStore'
import classNames from 'classnames';
import { Input, Table, Button, Modal } from 'antd'
import { SearchOutlined, FormOutlined, DeleteOutlined, CommentOutlined, SnippetsOutlined, EyeOutlined } from '@ant-design/icons'
import { getDefenceList,deleteDefence } from '@/services'
import { Link } from 'umi'
import { DefenceListParam, DefenceListItem } from '@/utils/interfacePrac';

    
const Defence: React.FC = () => {
    let { skill } = useStore()
    let [deleteId,setDeleteId]=useState('');  // 点击删除的id
    let [curSkill, setCurSkill] = useState('');  // 专业默认值
    let [curStatus, setCurStatus] = useState(0);  // 状态默认值
    let [title, setTitle] = useState('');
    let [searchTitle, setSearchTitle] = useState('')
    let [dataSource, setDataSource] = useState<DefenceListItem[]>([])
    let [isModalVisible, setIsModalVisible] = useState(false);
    let queryParams: DefenceListParam = { pageNum: 1, pageSize: 10, searchTitle: '', defenceStatus: '' }

    const status = ['全部', '未开始', '进行中', '已结束'];
    const columns = [
        {
            title: '名称',
            dataIndex: 'degenceName',
            align: 'center'
        },
        {
            title: '专业',
            dataIndex: 'majorName',
            align: 'center'
        },
        {
            title: '班级/计划',
            render: (rows: DefenceListItem) => {
                return (
                    <div>
                        <p>{rows.className}</p>
                        <p>{rows.planName}</p>
                    </div>
                )
            },
            align: 'center'
        },
        {
            title: '发起人',
            dataIndex: 'defenceAuthorName',
            align: 'center'
        },
        {
            title: '开始/截止时间',
            render: (rows: DefenceListItem) => {
                return (
                    <div>
                        <p>开始{rows.defenceCreateTime}</p>
                        <p>截止{rows.defenceEndTime}</p>
                    </div>
                )
            },
            align: 'center'
        },
        {
            title: '状态',
            render: (rows: DefenceListItem) => <span>{status[Number(rows.defenceStatus)]}</span>,
            align: 'center'
        },
        {
            title: '操作',
            render: (rows: DefenceListItem) => {
                if (rows.defenceStatus === 1) {
                    return (
                        <div>
                            <FormOutlined style={{ color: '#679cf6' }} />
                            <DeleteOutlined style={{ color: '#679cf6' }} onClick={()=>{
                                console.log(rows.defenceId);
                                showModal()
                                setDeleteId(rows.defenceId);
                            }}/>
                        </div>
                    )
                } else if (rows.defenceStatus === 2) {
                    return (
                        <div>
                            <CommentOutlined style={{ color: '#679cf6' }} />
                            <SnippetsOutlined style={{ color: '#679cf6' }} />
                        </div>
                    )
                } else if (rows.defenceStatus === 3) {
                    return (
                        <div>
                            <EyeOutlined style={{ color: '#679cf6' }} />
                        </div>
                    )
                }
            },
            align: 'center'
        }
    ];

    const showModal = () => {
        setIsModalVisible(true);

    };

    const handleOk = async () => {
        setIsModalVisible(false);
         let res=await deleteDefence(deleteId);
         console.log(res,'res');
         if(res.code===200){
            getDefenceList(queryParams).then(res => {
                if (res.code == 200) {
                    setDataSource(res.rows);
                }
            })
         }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        skill.getSkillLabel();
    }, [])

    // 发起请求 获取选中专业列表
    useEffect(() => {
        if (curStatus) {  // 如果状态不为空
            queryParams = { ...queryParams, defenceMjorId: curSkill, searchTitle, defenceStatus: curStatus }
        } else {
            queryParams = { ...queryParams, defenceMjorId: curSkill, searchTitle, defenceStatus: '' as unknown as number }
        }
        getDefenceList(queryParams).then(res => {
            if (res.code == 200) {
                setDataSource(res.rows);
            }

        })
    }, [curSkill, curStatus, searchTitle])
    return (
        <div className={defenceStyle.Defence}>
            {/* <header className={defenceStyle.header}>
                <a href="#">进度</a>/<a href='#'>进度监控</a>
            </header> */}
            <section className={defenceStyle.mainTop}>
                <section className={defenceStyle.major}>
                    <span>专业:</span>
                    <ul>
                        {
                            [{ id: '', name: '全部' }, ...skill.skillLabel].map(item => {
                                return <span
                                    key={item.id}
                                    className={item.id === curSkill ? classNames(defenceStyle.span, defenceStyle.active) : defenceStyle.span}
                                    onClick={() => setCurSkill(item.id)}
                                >{item.name}</span>
                            })
                        }
                    </ul>
                </section>
                <section className={defenceStyle.majorStatus}>
                    <span>状态:</span>
                    <ul>
                        {
                            status.map((item, index) => {
                                return <span
                                    key={index}
                                    className={index === curStatus ? classNames(defenceStyle.spanStatus, defenceStyle.active) : defenceStyle.spanStatus}
                                    onClick={() => { setCurStatus(index) }}
                                >{item}</span>
                            })
                        }
                    </ul>
                </section>
            </section>
            <section className={defenceStyle.majorTable}>
                <section className={defenceStyle.search}>
                    <Input placeholder='搜索名称/班级/计划'
                        suffix={<SearchOutlined onClick={() => setSearchTitle(title)} />}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onKeyDown={e => {
                            if (e.keyCode === 13) {
                                setSearchTitle(title)
                            }
                        }}
                    />
                    <Link to='/teachers/addDefence'>
                        <Button type="primary"> + 添加答辩</Button>
                    </Link>
                </section>
                <Table rowKey="defenceId" dataSource={dataSource} columns={columns as any}></Table>
            </section>
            <Modal title="提示" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} closable={true} okText={'确认'} cancelText={'取消'}>
                <p>你确定要删除该项答辩,是否继续?</p>
            </Modal>
        </div>
    )
}

export default Defence;