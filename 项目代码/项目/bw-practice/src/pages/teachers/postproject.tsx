import React, { Component, useState } from 'react'
import { useEffect } from 'react'
import {
    FormOutlined, DeleteOutlined, SendOutlined, EyeOutlined, RollbackOutlined, AudioOutlined, SearchOutlined
} from '@ant-design/icons';
import { IRouteComponentProps, Link } from 'umi'
import { IArr, Idata, Igetsxtype } from '../../utils/interface'
import { Table, Space, Input, Popover, Modal, message, Checkbox, Button, Alert } from 'antd';
import './postproject.less'
import { getdata, getlist, getarr, getsxtype, deleteitem, getundo, getaudit, mohu } from '../../services/index'
const postSkill: React.FC<IRouteComponentProps> = ({ history }) => {
    //列表数据
    let [data, setdata] = useState<Idata[]>([])
    //专业数据
    let [list, setlist] = useState<IArr[]>([])
    //类型数据
    let [arr, setarr] = useState<IArr[]>([])
    //初始下标
    let [hh1, sethh1] = useState(0)
    let [hh2, sethh2] = useState(0)
    let [hh3, sethh3] = useState(0)
    let [hh4, sethh4] = useState(0)
    //value
    let [value, setvalue] = useState('')
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal')
    let zhh = ['全部', '生产实训', '教学实训', '专业群实训']
    let zhh2 = ['全部', '草稿', '已发布', '待审核', '已驳回']
    const columns = [
        {
            title: '项目名称',
            dataIndex: 'proname',
        },
        {
            title: '版本',
            dataIndex: 'version',
        },
        {
            title: '任务数量',
            dataIndex: 'taskCount',
        },
        {
            title: '所属专业',
            dataIndex: 'trade',
        },
        {
            title: '所属行业',
            dataIndex: 'major',
        },
        {
            title: '实训类型',
            render: (text: any, record: { name: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; }) => (
                <Space size="middle">
                    {
                        text.sxtype === '1' ? "生产实训" : text.sxtype === '2' ? "教学实训" : text.sxtype === '3' ? "专业群实训" : ''
                    }
                </Space>
            ),
        },
        {
            title: '推荐完成天数',
            dataIndex: 'subjecttime',
        },
        {
            title: '更新时间',
            dataIndex: 'createTime',
        },
        {
            title: '演示',
            render: (text: any) => (
                <Space size="middle">
                    查看
                </Space>
            ),
        },
        {
            title: '状态',
            render: (text: any) => (
                <Space size="middle">
                    {
                        text.status === '1' ? <span >草稿  </span> : text.status === '2' ? <span style={{ color: '#29cb97' }}>已发布</span> : text.status === '3' ? <span style={{ color: '#67b5f8' }}>待审核</span> : text.status === '4' ? "已驳回" : ''
                    }
                </Space>
            ),
        },
        {
            title: '操作',//status
            render: (text: any) => (
                <Space size="middle">
                    {
                        text.status === '1' ? <span>
                            <Popover content={content1} title="">
                                <FormOutlined style={{ color: '#679cf6', fontSize: '18px' }} onClick={() =>{
                                    localStorage.setItem('versionId',text.versionId)
                                    history.replace('/teachers/EditPage')
                                }}/>
                            </Popover>
                            <Popover content={content2} title="">
                                <DeleteOutlined style={{ color: '#679cf6', fontSize: '18px' }} onClick={showModal} />
                                <Modal title="提示" visible={isModalVisible} onOk={() =>  handleOk(text) } onCancel={handleCancel}>
                                    <p>确定要删除该项目吗</p>
                                </Modal>
                            </Popover>
                            <Popover content={content3} title="">
                                <SendOutlined style={{ color: '#679cf6', fontSize: '18px' }} onClick={() => {
                                    audit(text)
                                    console.log("1231223123123")
                                }} />
                            </Popover>
                        </span> : text.status === '2' ?
                            <Popover content={content4} title="">
                                <EyeOutlined style={{ color: '#679cf6', fontSize: '18px' }} onClick={() => {
                                        history.replace('/teachers/Projectdetails')
                                    }
                                    }/>
                            </Popover>
                            : text.status === '3' ? <span>
                                <Popover content={content4} title="" >
                                    <EyeOutlined style={{ color: '#679cf6', fontSize: '18px' }}  onClick={() => {
                                        localStorage.setItem('versionId',text.versionId)
                                        history.replace('/teachers/Projectdetails')
                                    }
                                    }/>
                                </Popover>
                                <Popover content={content5} title="">
                                    <RollbackOutlined style={{ color: '#679cf6', fontSize: '18px' }} onClick={showModal1} />
                                    <Modal
                                        title="提示"
                                        visible={visible}
                                        onOk={() => { handleOk1(text) }}
                                        confirmLoading={confirmLoading}
                                        onCancel={handleCancel1}
                                    >
                                        <p>{"确定撤销该项目吗"}</p>
                                    </Modal>
                                </Popover>
                            </span> : text.status === '4' ? "已驳回" : ''
                    }
                </Space>
            ),
        },
    ];
    useEffect(() => {
        getdata().then(ok => {
            console.log("-------------", ok.rows)
            setdata(ok.rows)
        })
        getlist().then(ok => {
            setlist(ok.data)
            console.log(ok)
        })
        getarr().then(ok => {
            console.log(ok.data)
            setarr(ok.data)
        })
    }, [])
    useEffect(() => {
        let params: Igetsxtype = {} as Igetsxtype
        params = {
            isAsc: 'desc',
            pageNum: 1,
            pageSize: 10,
            sxtype: hh1 === 0 ? null : hh1,
            status: hh4 === 0 ? null : hh4,
            proName: null,
            newProjectList: 0,
            specialtyTag: hh2 < 10 && hh2 != 0 ? 'P000' + hh2 : hh2 === 0 ? null : 'P00' + hh2,
            industryTag: hh3 < 10 && hh2 != 0 ? 'I000' + hh3 : hh3 === 0 ? null : 'I00' + hh3
        }
        getsxtype(params).then(ok => {
            setdata(ok.rows)
        })
    }, [hh1, hh2, hh3, hh4])
    const content1 = (
        <p>编辑</p>
    );
    const content2 = (
        <p>删除</p>
    );
    const content3 = (
        <p>提交审核</p>
    );
    const content4 = (
        <p>查看</p>
    );
    const content5 = (
        <p>撤销</p>
    );

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = (id: any) => {
        console.log(id);
        
        setIsModalVisible(false);
        deleteitem(id.versionId).then(ok => {
            console.log(ok)
            let params: Igetsxtype = {} as Igetsxtype
            params = {
                isAsc: 'desc',
                pageNum: 1,
                pageSize: 10,
                sxtype: hh1 === 0 ? null : hh1,
                status: hh4 === 0 ? null : hh4,
                proName: null,
                newProjectList: 0,
                specialtyTag: hh2 < 10 && hh2 != 0 ? 'P000' + hh2 : hh2 === 0 ? null : 'P00' + hh2,
                industryTag: hh3 < 10 && hh2 != 0 ? 'I000' + hh3 : hh3 === 0 ? null : 'I00' + hh3
            }
            getsxtype(params).then(ok => {
                setdata(ok.rows)
            })

        })
        let params: Igetsxtype = {} as Igetsxtype
        params = {
            isAsc: 'desc',
            pageNum: 1,
            pageSize: 10,
            sxtype: hh1 === 0 ? null : hh1,
            status: hh4 === 0 ? null : hh4,
            proName: null,
            newProjectList: 0,
            specialtyTag: hh2 < 10 && hh2 != 0 ? 'P000' + hh2 : hh2 === 0 ? null : 'P00' + hh2,
            industryTag: hh3 < 10 && hh2 != 0 ? 'I000' + hh3 : hh3 === 0 ? null : 'I00' + hh3
        }
        getsxtype(params).then(ok => {
            setdata(ok.rows)
            console.log(ok)
        })
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModal1 = () => {
        setVisible(true);

    };

    const handleOk1 = (text: any) => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setVisible(false);
        setConfirmLoading(false);
        getundo(text.versionId).then(ok => {
            console.log(ok)
            if (ok.msg === '大纲所有项都不允许为空') {
                <Alert
                    message=""
                    description="大纲所有项都不允许为空"
                    type="error"
                    showIcon
                />
            } else {
                <Alert message="提交审核成功" type="success" showIcon />
            }

        })
    };

    const handleCancel1 = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };


    const audit = (text: any) => {
        getaudit(text.versionId).then(ok => {
            console.log(ok)
            message.success(ok.msg, 1)
        })
    }
    const changecheckbox = (e: any) => {
        let params: Igetsxtype = {} as Igetsxtype
        params = {
            isAsc: 'desc',
            pageNum: 1,
            pageSize: 10,
            sxtype: hh1 === 0 ? null : hh1,
            status: hh4 === 0 ? null : hh4,
            proName: null,
            newProjectList: 0,
            specialtyTag: hh2 < 10 && hh2 != 0 ? 'P000' + hh2 : hh2 === 0 ? null : 'P00' + hh2,
            industryTag: hh3 < 10 && hh2 != 0 ? 'I000' + hh3 : hh3 === 0 ? null : 'I00' + hh3
        }
        getsxtype(params).then(ok => {
            setdata(ok.rows)
        })
    }
    const setvalues = (e: any) => {
        setvalue(e.target.value)
    }
    const { Search } = Input;
    const onSearch = (value: any) => console.log(value);
    return <div className='cww_project_wrap'>

        <div className="titleconst">
            <div className="zi">
                项目/项目管理
           </div>
        </div>
        <div className='cww_project_head'>

            <div className="head_left">
                <span><b>实训类型</b></span>
            </div>
            <div className="head_right">
                {
                    zhh.map(((item, index) => {
                        return <span key={index} className={index === hh1 ? 'active' : ''} onClick={() => {
                            sethh1(index)
                        }}>{item}</span>
                    }))
                }
            </div>
        </div>
        <div className='cww_project_head'>
            <div className="head_left">
                <span><b>行业</b></span>
            </div>
            <div className="head_right">
                {
                    [{
                        children: null,
                        content: null,
                        label: '全部',
                        parentId: null,
                        proId: null,
                        value: ''
                    }, ...list].map((item, index) => {
                        return <span key={index} className={index === hh3 ? 'active' : ''} onClick={() => {
                            sethh3(index)
                        }}>{item.label}</span>
                    })
                }
            </div>
        </div>
        <div className='cww_project_head'>
            <div className="head_left">
                <span><b>专业</b></span>
            </div>
            <div className="head_right">
                {
                    [{
                        children: null,
                        content: null,
                        label: '全部',
                        parentId: null,
                        proId: null,
                        value: ''
                    }, ...arr].map((item, index) => {
                        return <span key={index} className={index === hh2 ? 'active' : ''} onClick={() => {
                            sethh2(index)
                        }}>{item.label}</span>
                    })
                }
            </div>
        </div>
        <div className='cww_project_head'>
            <div className="head_left">
                <span><b>状态</b></span>
            </div>
            <div className="head_right">
                {
                    zhh2.map(((item, index) => {
                        return <span key={index} className={index === hh4 ? 'active' : ''} onClick={() => {
                            sethh4(index)
                        }}>{item}</span>
                    }))
                }
            </div>
        </div>
        <div className='ystou'>
            <div className="danxuan">
                <Checkbox onChange={changecheckbox}>仅看最新版</Checkbox>
            </div>
            <div className="sou">
                <input type="text" value={value} onChange={setvalues} onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        let params = {
                            isAsc: 'desc',
                            pageNum: 1,
                            pageSize: 10,
                            sxtype: hh1 === 0 ? null : hh1,
                            status: hh4 === 0 ? null : hh4,
                            proName: value,
                            newProjectList: 0
                        }
                        mohu(params).then(ok => {
                            console.log(ok)
                            setdata(ok.rows)
                        })
                    }
                }} />
                <SearchOutlined className='ic' onClick={() => {
                    let params = {
                        isAsc: 'desc',
                        pageNum: 1,
                        pageSize: 10,
                        sxtype: hh1 === 0 ? null : hh1,
                        status: hh4 === 0 ? null : hh4,
                        proName: value,
                        newProjectList: 0
                    }
                    mohu(params).then(ok => {
                        console.log(ok)
                        setdata(ok.rows)
                    })
                }} />
            </div>
            <div className='tianjia'>
                <Link to="/teachers/addProject?see=false">
                    <Button type="primary" >添加项目</Button>
                </Link>
            </div>
        </div>

        <div className="cww_project_body">
            <Table rowKey="versionId" dataSource={data} columns={columns} />;
      </div>

    </div >

}

export default postSkill
