import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { Button, Cascader, InputNumber, Upload } from 'antd';
import {
    FullscreenOutlined
} from '@ant-design/icons';
import './Projectdetails.less';
import { detaildate } from '../../services/index'
import { IRouteComponentProps } from 'umi';
const Projectdetails: React.FC<IRouteComponentProps> = ({ history }) => {
    const [id, setid] = useState<string | null>(localStorage.getItem('versionId'))
    const [name, setname] = useState('') //项目名字
    const [description, setdescription] = useState('') //简介
    const [sxType, setsxType] = useState('') //实训类型
    const [tradeName, settradeName] = useState('') //行业
    const [version, setversion] = useState('')  //版本号
    const [showUrl, setshowUrl] = useState('') //地址
    const [labelName, setlabelName] = useState('')//专业前面
    const [stationName, setstationName] = useState('')//专业后面
    const [subjectTime, setsubjectTime] = useState('')//工天
    useEffect(() => {
        console.log(id)
        detaildate({ versionId: id }).then((ok: { data: { name: React.SetStateAction<string>; description: React.SetStateAction<string>; sxType: React.SetStateAction<string>; tradeName: React.SetStateAction<string>; version: React.SetStateAction<string>; showUrl: React.SetStateAction<string>; labelName: React.SetStateAction<string>; stationName: React.SetStateAction<string>; subjectTime: React.SetStateAction<string>; }; }) => {
            console.log(ok.data)
            setname(ok.data.name)
            setdescription(ok.data.description)
            setsxType(ok.data.sxType)
            settradeName(ok.data.tradeName)
            setversion(ok.data.version)
            setshowUrl(ok.data.showUrl)
            setlabelName(ok.data.labelName)
            setstationName(ok.data.stationName)
            setsubjectTime(ok.data.subjectTime)
        })
    }, [])
    return (
        <div className='cww_Projectdetails'>
            <div className="box_title">
                <div className="zi">项目/查看项目</div>
            </div>
            <div className="cww_cww_Projectdetails_box">
                <div className="cww_box_herad">
                    <span className='cww_yz'><b>查看项目</b></span>
                    <Button className='cww_btn1' onClick={() => {
                        history.replace('/teachers/postproject')
                    }}>返回</Button>
                </div>

                <div className="cww_two">
                    <div className="cww_two_one">
                        <div className="cww_two_two">
                            <div className="cww_two_two_one">
                                <FullscreenOutlined /> <b>项目名称</b>  <span className='ipt1' >{name}</span>
                                <FullscreenOutlined />  <b>版本 V</b> <span className='ipt2' >{version}</span>
                            </div>
                            <div className="cww_two_two_two">
                                <span className='ipt7' > {description}</span>
                            </div>
                            <div className="cww_two_two_san">
                                <FullscreenOutlined /> <b>专业</b>   <span className='ipt3'> {labelName + '/' + stationName}</span>
                                <FullscreenOutlined /> <b>行业</b> <span className='ipt4' > {tradeName} </span>
                            </div>
                            <div className="cww_two_two_si">
                                <FullscreenOutlined /> <b>实训类型</b>{sxType === "1" ? "生产实训" : sxType === "2" ? "教学实训" : "专业群实训"} <span className='ipt5' ></span>
                                <b>预期总工时</b> <span className='ipt6' >{subjectTime}</span>
                            </div>
                            <div className="cww_two_two_wu">
                                <b>技能点</b> 技能点由任务知识点内容生成
                                </div>
                        </div>
                        <div className="cww_two_san">
                            <div className="cww_two_san_one">
                                <FullscreenOutlined /> <b>封面</b>
                            </div>
                            <div className="cww_two_san_two">
                                <img src="/file_service/group1/M00/00/1A/rBsCHWC3g0aAZiqIAACVD3yHL-Y09.jpeg" alt="" />
                            </div>
                            <div className="cww_two_san_san">
                                <FullscreenOutlined /> <b>演示地址</b> <span className='ipt8' >
                                    {showUrl}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Projectdetails;