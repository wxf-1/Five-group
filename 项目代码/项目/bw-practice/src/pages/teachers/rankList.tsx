import React, { Component, useEffect, useState } from 'react'
import { getDateClass } from '../../services/modules/rankList'
import { IClassInfo } from '../../utils/rankList'
import { Table } from 'antd'
import './rankList.less'
const rankList: React.FC = () => {
    let [dataSource, setDateSource] = useState<IClassInfo[]>([])
    let [index, setIndex] = useState(1)
    let [indexx, setIndexx] = useState(1)
    const columns = [
        {
            title: '排名',
            dataIndex: 'rangking',
        },
        {
            title: '提交人',
            dataIndex: 'commitName',
        },
        {
            title: '面试记录提交数',
            dataIndex: 'count',
        },
        {
            title: '班级',
            dataIndex: 'count',
        },
        {
            title: '专业',
            dataIndex: 'majorName',
        },
    ];
    //接口调用
    useEffect(() => {
        getDateClass().then(res => {
            console.log(res)
            //调用
            setDateSource(res.rows)
        })
    }, [index]
    )
    return (
        <div className='view'>
            <p>面试/面试排行榜</p>

            <div className="classinfo">
                <span>班级: </span>
                {/* 绑定点击事件 */}
                <span className={index === 1 ? 'active' : ''} onClick={() => {
                    setIndex(1)
                }} >全部</span>
                <span className={index === 2 ? 'active' : ''} onClick={() => {
                    setIndex(2)
                }}>网站1809A </span>
            </div>
            <div>
                <li className="record">
                    <span className={indexx === 1 ? 'activee' : ''} onClick={() => {
                    setIndexx(1)
                }} >面试记录榜单</span>
                    <span className={indexx === 2 ? 'activee' : ''} onClick={() => {
                    setIndexx(2)
                }} >面试题榜单</span></li>

                <Table dataSource={dataSource} columns={columns} />;
        </div>
        </div>
    )
}
//进行接口抛出
export default rankList