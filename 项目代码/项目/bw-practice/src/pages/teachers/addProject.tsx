import React, { Component, useEffect, useState } from 'react'
import './addProject.less'
import { Button, Cascader, InputNumber, Upload, message } from 'antd';
import {
    WalletTwoTone, FullscreenOutlined, LoadingOutlined, PlusOutlined,AlibabaOutlined
} from '@ant-design/icons';
import { getaddlistzhuanye, getaddlistone } from '../../services/index'
import { updatecode } from '../../services/index'
import { IRouteComponentProps } from 'umi';
const addProject: React.FC<IRouteComponentProps> = ({ history }) => {
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [pictureUrl, setpictureUrl] = useState('')
    const [majorStationList, setmajorStationList] = useState([])
    const [shpwUrl, setshpwUrl] = useState('')
    const [sxType, setsxType] = useState('')
    const [trade, settrade] = useState([])
    const [version, setversion] = useState('1')
    const [zhuanye, setzhuanye] = useState([])
    const [hangye, sethangye] = useState([])
    const [loading, setLoading] = useState<boolean>(false)
    const [imageUrl, setImageUrl] = useState<any>()


    const options = [
        {
            value: '1',
            label: '生产实训',
        },
        {
            value: '2',
            label: '专业实训',
        },
        {
            value: '3',
            label: '专业群实训',
        }
    ];

    useEffect(() => {
        getaddlistzhuanye().then(ok => {
            console.log(ok)
            setzhuanye(ok.data)
        })
        getaddlistone().then(ok => {
            console.log(ok)
            sethangye(ok.data)
        })
    }, [])

    function getBase64(img: any, callback: any) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file: any) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    function onChangeabc(value: any) {
        setmajorStationList(value)
    }
    function onChangeacb(value: any) {
        settrade(value)
    }
    function onChangecba(value: any) {
        setsxType(value)
    }
    function onChangegs(value: any) {
        setversion(value)
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    function handleChange(info: any) {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl: any) =>

                setImageUrl(imageUrl)

                // setLoading(false)
            );
            console.log(setImageUrl)
        }
    };
    return (
        <div className='cww_project_box'>
            <div className="box_title">
                <div className="zi">项目/添加项目</div>
            </div>
            <div className="shen">
                <div className="box_herad">
                    <span className='yz'><b>添加项目</b></span>
                    <Button className='btn1' onClick={() =>{
                        history.replace('/teachers/postproject')
                    }}>返回</Button>
                    <span className='btn2'> <span>提交审核</span></span>
                </div>
                <div className="box_shen">
                    <div className="cww_one">
                        <span className='cww_one_s1'><b>基本信息</b></span>  <span className='cww_one_s2' onClick={() => {
                            updatecode({
                                description: description,
                                id: "",
                                knowledge: [],
                                majorId: "",
                                majorStationList: majorStationList,
                                name: name,
                                pictureUrl: "/file_service/group1/M00/00/1A/rBsCHWC3g0aAZiqIAACVD3yHL-Y09.jpeg",
                                showUrl: shpwUrl,
                                stationId: "",
                                subjectTime: 1,
                                sxType: "1",
                                trade: trade,
                                tradeId: "",
                                version: version,
                                versionId: "" 
                            }).then(ok => {
                                console.log(ok)
                                localStorage.setItem('versionId',ok.data.versionId)
                                message.success('添加成功', 1, () => {
                                    history.replace('/teachers/Projectdetails')
                                })
                            })
                        }}> <WalletTwoTone />保存</span>
                    </div>
                    <div className="cww_two">
                        <div className="cww_two_one">
                            <div className="cww_two_two">
                                <div className="cww_two_two_one">
                                    <FullscreenOutlined style={{color:"red"}}/> <b>项目名称</b>  <input type="text" className='ipt1' placeholder='请输入项目名称' value={name} onChange={(e) => {
                                        setname(e.target.value)
                                    }} />
                                    <FullscreenOutlined style={{color:"red"}}/>  <b>版本 V</b> <input type="text" className='ipt2' value={version} onChange={(e) => {
                                        setversion(e.target.value)
                                    }} />
                                </div>
                                <div className="cww_two_two_two">
                                    <input type="text" className='ipt7' placeholder='请输入简介' value={description} onChange={(e) => {
                                        setdescription(e.target.value)
                                    }} />
                                </div>
                                <div className="cww_two_two_san">
                                    <FullscreenOutlined style={{color:"red"}}/> <b>专业</b>   <Cascader options={zhuanye} onChange={onChangeabc} placeholder="请选择" className='ipt3' />
                                    <FullscreenOutlined style={{color:"red"}}/> <b>行业</b> <Cascader options={hangye} onChange={onChangeacb} placeholder="请选择" className='ipt4' />
                                </div>
                                <div className="cww_two_two_si">
                                    <FullscreenOutlined style={{color:"red"}}/> <b>实训类型</b> <Cascader options={options} onChange={onChangecba} placeholder="选择类型" className='ipt5' />
                                    <b>预期总工时</b> <InputNumber min={1} max={10} defaultValue={3} onChange={onChangegs} className='ipt6' /><b>天</b>
                                </div>
                                <div className="cww_two_two_wu">
                                    <b>技能点</b> 技能点由任务知识点内容生成
                                </div>
                            </div>
                            <div className="cww_two_san">
                                <div className="cww_two_san_one">
                                    <FullscreenOutlined style={{color:"red"}}/> <b>封面</b>
                                </div>
                                <div className="cww_two_san_two">
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                </div>
                                <div className="cww_two_san_san">
                                    <FullscreenOutlined style={{color:"red"}}/> <b>演示地址</b>  <input type="text" placeholder='请输入演示地址' className='ipt8' value={shpwUrl} onChange={(e) => {
                                        setshpwUrl(e.target.value)
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default addProject