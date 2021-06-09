import React from "react";
// 引入antd组件
import { Table, Tag, Space,Input } from 'antd';
import {DownOutlined,SearchOutlined} from "@ant-design/icons"
// 引入样式部分
import yjsneed from "./needHandle.less";
// 引入多重命名
import classNames from "classnames";
const NeedHandle:React.FC=()=>{
    const data:any[]=[]
      const columns = [
        {
          title: '待办事项',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '类型',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '发起人',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '发起时间',
          key: 'tags',
          dataIndex: 'tags',
        },
        {
          title: '操作',
          key: 'action',
        },
      ];
    return <div className={yjsneed.ymaxbox}>
        {/* 上半部分 */}
        <section className={yjsneed.ytopbox}>
            {/* 搜索部分 */}
            <div className={yjsneed.ytopinputbox}>
            <Input className={yjsneed.ytopinput} size="large" placeholder="请选择班级" suffix={<DownOutlined className={yjsneed.iconcolor}/>} />
            </div>
           {/* 上半部分的主要内容 */}
           <div className={yjsneed.ytopdiv}>
           <div className={yjsneed.ytopdivchild}>
                <img src="http://111.203.59.61:8060/static/img/need_all.f33d257f.svg" alt=""/>
                <div>
                    <div className={classNames(yjsneed.ytopnumber,yjsneed.ynumberleft)}>0</div>
                    <div className={yjsneed.ytoptext}>全部</div>
                </div>
            </div>
            <div className={yjsneed.ytopdivchild}>
                <img src="http://111.203.59.61:8060/static/img/question.dd523812.svg" alt=""/>
                <div>
                    <div className={classNames(yjsneed.ytopnumber,yjsneed.ynumberright)}>0</div>
                    <div className={yjsneed.ytoptext}>问答</div>
                </div>
            </div>
           </div>
        </section>
        {/* 下半部分 */}
        <section className={yjsneed.ynext}>
            <div className={yjsneed.ynextserch}>
            <Input className={classNames(yjsneed.ynextinput, yjsneed.ytopinput)} size="large" placeholder="请选择班级" suffix={<SearchOutlined  className={yjsneed.iconcolor}/>} />
            </div>
            <Table columns={columns} dataSource={data.length?data:undefined}/>
        </section>
    </div>
}
export default NeedHandle;