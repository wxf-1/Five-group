import { getSkillLabel, getSkillList } from '@/services';
import { ISKILLlist, ISkillListItem, RootObject } from '@/utils/interface';
import React, { useState, useEffect } from 'react'
import { Link } from 'umi'
import { Table, Input, Button, Space, Checkbox,Breadcrumb  } from 'antd'
import '../index.less'
import styles from './postSkill.less'
import classNames from 'classnames';
import { EyeOutlined, RollbackOutlined, FormOutlined, DeleteOutlined, DeliveredProcedureOutlined } from '@ant-design/icons';

// 引入 StoreContext
import StoreContext from '@/context/storeContext'
import store from '@/store';
import { useContext } from 'react';
import {observer} from 'mobx-react-lite'
import useStore from '@/context/useStore';
const { Search } = Input;
const status = ['全部', '草稿', '已发布', '待审核', '已驳回'];
const columns = [
    {
        title: '岗位名称',
        dataIndex: 'name',
    },
    {
        title: '专业',
        dataIndex: 'majorName',
    },
    {
        title: '版本号',
        dataIndex: 'stationVersion',
    },
    {
        title: '技能数量',
        dataIndex: 'skillNum',
    },
    {
        title: '作者',
        dataIndex: 'userName',
    },
    {
        title: '发起时间',
        dataIndex: 'createTime',
    },
    {
        title: '状态',
        render: (row: ISkillListItem) => <span className={styles[`status${row.status}`]}>{status[Number(row.status)]}</span>,
    },
    {
        title: '操作',
        render: (row: ISKILLlist) => {
            if (row.status == '3') {
                return <div className={styles.action}>
                    <EyeOutlined style={{ color: '#679cf6' }} />
                    <RollbackOutlined style={{ color: '#679cf6' }} />
                </div>
            } else if (row.status == '1') {
                return <div className={styles.action}>
                    <FormOutlined style={{ color: '#679cf6' }} />
                    <DeliveredProcedureOutlined style={{ color: '#679cf6' }} />
                    <DeleteOutlined style={{ color: '#679cf6' }} />
            </div>
            }
        }
    }
];

const PostSkill: React.FC = props => {

    let queryParams = { isAsc: 'desc', pageNum: 1, pageSize: 10, isMyInfo: false }
    //分类
    let [skillLabel, setSkillLabel] = useState<RootObject[]>([])
    let [curSkill, setCurSkill] = useState('');
    let [curStatus, setCurStatus] = useState(1)
    let [dataSource, setDateSource] = useState<ISKILLlist[]>([])
    //仅看我的
    let [isMyInfo, setMyInfo] = useState(false);
    let [title, setTitle] = useState('');

    let { skill } = useStore()
    // console.log('...skill...', skill);

    //搜索
    let [searchTitle, setSearchTitle] = useState('');
    useEffect(() => {
        skill.getSkillLabel()
        console.log(123)
    }, [])

    useEffect(() => {
        let queryParams: ISkillListItem = {} as ISkillListItem
        // console.log(curSkill, curStatus);
        if (curStatus) {
            queryParams = { ...queryParams, isMyInfo, searchTitle, majorId: curSkill, status: curStatus }
        } else {
            queryParams = { ...queryParams, isMyInfo, searchTitle, majorId: curSkill, status: '' as unknown as number }
        }
        getSkillList(queryParams).then(res => {
            // console.log('getskilllist...', res);
            if (res.code == 200) {
                setDateSource(res.rows)
            }
        })
    }, [curSkill, curStatus, isMyInfo, searchTitle])
    window.document.title='八维教育'

    return <div className={styles.postskill}>
        <section id='zy'>
            <span>专业</span>
            <ul> <span>全部</span>
                {
                    [{id:'',name:'全部'},...skill.skillLabel].map(item => {
                        return <span key={item.name} className={item.id === curSkill ? classNames(styles.span, styles.active) : styles.span} onClick={e => setCurSkill(item.id)}>{item.name}</span>
                    })
                }
            </ul>
        </section>
        <section id='zy'>
            <span>状态</span>
            <ul>
                {
                    status.map((item, index) => {
                        return <span className={index === curStatus ? classNames(styles.span, styles.active) : styles.span} onClick={e => setCurStatus(index)} key={index}>
                            {item}
                        </span>
                    })
                }
            </ul>
        </section>
        <div className='sousuo'>
            <input type="checkbox" checked={isMyInfo} onChange={e => setMyInfo(e.target.checked)} />只看我的
            <Input placeholder="搜索岗位" style={{ width: 200 }} value={title} onChange={e => setTitle(e.target.value)} onKeyDown={e => {
                if (e.keyCode === 13) {
                    setSearchTitle(title)
                }
            }} />
            <Link to="/teachers/addPostSkill?see=false">
                <Button type="primary">＋添加岗位</Button>
            </Link>

        </div>
        <Table rowKey="stationId" dataSource={dataSource} columns={columns} />;
    </div>
}
export default observer(PostSkill)