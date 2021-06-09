import classNames from 'classnames';
import React, { Component } from 'react';
//引入useState,useEffect
import { useState, useEffect } from 'react';
import { getDatazhh, getSkillList, getSkillData, getFuzzy } from '../../services/modules/interviewList'
//抛出的接口
import { Iprofessional, ISkillListItem, ISkillList } from '../../utils/interviewList'
import { IRouteComponentProps } from '@umijs/renderer-react';
//引入样式
import styles from './interviewList.less'
import './interviewList.less'
//引入antd
import { Table, Input } from 'antd'
// import { EyeOutlined, RollbackOutlined, FormOutlined, DeleteOutlined, DeliveredProcedureOutlined } from '@ant-design/icons';
const interviewList: React.FC<IRouteComponentProps> = ({ history }) => {
  let [datazhh, setdatazhh] = useState<Iprofessional[]>([])
  let [curStatus, setCurStatus] = useState(1)
  let [interStatus, setInterStatus] = useState(1)
  let [dataSource, setDateSource] = useState<ISkillList[]>([])
  //定义状态
  const status = ['面试结果:', '全部', '通过', '未通过', '不确定'];
  let [title, setTitle] = useState('')
  const columns = [
    {
      title: '岗位名称',
      //绑定点击事件
      render: (row: ISkillListItem) => <span onClick={() => {
        history.replace(`./interviewRecord?interviewId=${row.interviewId}`)
      }}>
        {
          row.stationName
        }
      </span>
    },

    {
      title: '公司名称',
      dataIndex: 'companyName',
    },
    {
      title: '面试时间',
      dataIndex: 'interviewTime',
    },
    {
      title: '面试官',
      dataIndex: 'intervierManagement',
    },
    {
      title: '专业',
      dataIndex: 'majorName',
    },
    {
      title: '提交人',
      dataIndex: 'commitName',
    },
    {
      title: '录音文件',
      render: (row: ISkillListItem) => <span>
        {
          row.status === 0 ? <span style={{ color: '#000' }}>有</span> : row.status === 1 ? <span style={{ color: '#000' }}>无</span> : ''
        }
      </span>
    },
    {
      title: '面试结果',
      render: (row: ISkillListItem) => <span>
        {
          //状态判断  进行渲染
          row.status === 0 ? <span style={{ color: '#29cb97' }}>通过</span> : row.status === 1 ? <span style={{ color: 'red' }}>未通过</span> : row.status === 2 ? <span style={{ color: '#303849' }}>不确定</span> : ''
        }
      </span>
    },
  ];
  useEffect(() => {
    getSkillList().then(res => {
      //打印数据
      console.log(res);
      //进行调用
      setDateSource(res.rows)
    })
    getDatazhh().then(res => {
      console.log(res)
      setdatazhh([{
        children: null,
        id: null,
        name: "全部",
        parentId: "A0000"
      }, ...res.data])
    })
  }, [])

  return <div className='interList'>
    {/* <p>面试/面试记录</p> */}
    <div className="all">
      <section>
        <ul>
          {
            [{
              id: new Date().getTime(),
              name: '专业:'
            }, ...datazhh].map((item, index) => {
              //绑定点击事件
              return <span key={item.id} className={index === curStatus ? classNames(styles.span, styles.active) : styles.span}
                onClick={e => {
                  let params = {
                    searchTitle: null,
                    status: null,
                    pageNum: 1,
                    pageSize: 10,
                    majorId: item.id,
                  }
                  setCurStatus(index)
                  getSkillData(params).then(res => {
                    console.log(res)
                    setDateSource(res.rows)
                  })
                }}>{item.name}</span>
            })
          }
        </ul>
      </section>
      <section id='jg'>
        <ul>
          {
            //进行循环遍历
            status.map((item, index) => {
              //添加类名  绑定点击事件
              return <span className={index === interStatus ? classNames(styles.span, styles.active) : styles.span} onClick={e => setInterStatus(index)} key={index}>
                {item}
              </span>
            })
          }
        </ul>
      </section>
    </div>
    <div className="search" >
      {/* 搜索岗位   添加onchange事件*/}
      <Input placeholder="搜索岗位/公司名称" onChange={(e) => { setTitle(e.target.value) }} onKeyDown={(e) => {
        //键盘按下事件
        if (e.keyCode === 13) {
          let params = {
            searchTitle: title,
            status: 0,
            pageNum: 1,
            pageSize: 10
          }
          // 接口
          getFuzzy(params).then(res => {
            console.log(res);
            //进行接口调用
            setDateSource(res.rows)
          })
        }
      }} />
    </div>
    {/* antd表格 */}
    <div className="div">
      <Table rowKey="interviewId" dataSource={dataSource} columns={columns} />
    </div>
  </div >
}
// 进行抛出
export default interviewList;