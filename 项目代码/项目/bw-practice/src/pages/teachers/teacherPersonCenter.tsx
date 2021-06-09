// 引入
import React, { useEffect,useState } from "react";
import {observer} from 'mobx-react-lite';
import useStore from "@/context/useStore";
// 引入antd组件
import { Form, Input, Button,Radio,message,Modal,Upload } from 'antd';
// 引入图标
import {UserOutlined,ShakeOutlined,MailOutlined} from "@ant-design/icons";
// 引入样式
import yjsstyle from "./teacherPersonCenter.less";
// 引入路径使用
import {IRouteComponentProps} from "umi";
// 引入请求(要保存的数据)
import {setuserlist} from "@/services/modules/teacherPersonCenter"
import classNames from "classnames";
// 引入上传图片
import {upload,setimgs} from "@/services/modules/question"

const TeacherPersonCenter:React.FC<IRouteComponentProps>=({history})=>{
    let {teacherPersonCenter}=useStore();
   
    const [passwordflag,setpasswordflag]=useState(true);
    // 头像的开关
    const [isModalVisible, setIsModalVisible] = useState(false);
    // 头像地址
    const [src,setsrc]=useState(`http://111.203.59.61:8060${teacherPersonCenter.userlist.avatar}`);
    // 图片信息
    const [form,setform]=useState<FormData>();
    // 上传图片
   async function uploadImg(file: File){
    let form = new FormData();
    form.append('img', file);
    setform(form);
    let result =setimgs(form);
    console.log(result);
    
    // let {path} = result.data[0];
    // setsrc(path);
   }

    const layout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 7 },
      };
      useEffect(() => {
        teacherPersonCenter.questionlistfn();
        setsrc(`http://111.203.59.61:8060${teacherPersonCenter.userlist.avatar}`)
      }, []);
    //   保存时候做的事情
    const onFinish = (values: any) => {
        setuserlist({...teacherPersonCenter.userlist,...values})
      };
    //   关闭时候做的事情
    const onFinishFailed = () => {
        history.replace("/teachers/needHandle");
      };
    // 修改密码
    function onfixpassword(value:any){
        let {oldPassword,newPassword,newword}=value;
        if(newPassword!=newword){
            message.error('两次密码不一致')
        }else{
        teacherPersonCenter.changepassword({oldPassword:oldPassword,newPassword:newPassword})
        .then(res=>{
           if(res==200){
                message.success('修改成功')
            }
         });
         
        }
    }
   


    const onChange = ({ fileList}:any) => {
        console.log(fileList[0].response);
        if(fileList[0].response&&fileList[0].response.code==1){
            setsrc(fileList[0].response.data[0].path)            
        }
        
        // setFileList(newFileList);
      };
     return <div className={yjsstyle.ymaxbox}>
        <div className={yjsstyle.ybox}>
        <div className={yjsstyle.yleftmaxbox}>
        <section className={yjsstyle.yleftbox}>
            <div className={yjsstyle.yleftboxtop}>
                个人信息
            </div>
            <div className={classNames(yjsstyle.ymainbox,yjsstyle.yleftmainbox)}>
                <div>
                    <img className={yjsstyle.yleftimg} src={`http://111.203.59.61:8060${teacherPersonCenter.userlist.avatar}`} alt="" onClick={()=>{
                        setIsModalVisible(true)
                    }}/>
                {/* 上传头像部分 */}
                  {
                      isModalVisible?
                        <>
                        {/* <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}> */}

                        <Modal title="修改头像" visible={isModalVisible} footer={null} onCancel={()=>setIsModalVisible(false)}>
                        <div className={yjsstyle.ycboxs}>
                        <div className={yjsstyle.yyimg}>
                        <img src={src} alt="" />
                        </div>
                        <input type="file" onChange={e=>{
                            if(e.target.files&&e.target.files[0]){
                                uploadImg(e.target.files[0])
                            }
                        }}/>
                        </div>
                        </Modal>
                        </>:""
                  }
                </div>
                <ul>
                    <li className={classNames(yjsstyle.yitem,yjsstyle.yitemtop) }><span><UserOutlined />用户名称</span><span>{teacherPersonCenter.userlist.userName}</span></li>
                    <li className={yjsstyle.yitem}><span><ShakeOutlined />手机号码</span><span>{teacherPersonCenter.userlist.phonenumber}</span></li>
                    <li className={yjsstyle.yitem}><span><MailOutlined />用户邮箱</span><span>{teacherPersonCenter.userlist.email}</span></li>
                </ul>
            </div>
        </section>
        </div>
        <div className={yjsstyle.yrightmaxbox}>
        <section className={yjsstyle.yrightbox}>
            <div className={yjsstyle.yrighttop}>
                基本资料
            </div>
            <div className={yjsstyle.ymainbox}>
                {/* 修改右侧展示内容 */}
            <div className={yjsstyle.yrighttopitembottom}>
                <span className={yjsstyle.yrighttopitem} onClick={()=>{
                    setpasswordflag(true)
                }}>基本资料</span>
                <span className={yjsstyle.yrighttopitem} onClick={()=>{
                    setpasswordflag(false)
                }}>修改密码</span>
            </div>
            {
                passwordflag?
                <div>
                                <Form
                                {...layout}
                                name="basic"
                                initialValues={{...teacherPersonCenter.userlist}}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                >
                                <Form.Item
                                    label="用户昵称"
                                    name="nickName"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input className={yjsstyle.yrightinput}/>
                                </Form.Item>
                                <Form.Item
                                    label="手机号码"
                                    name="phonenumber"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input  className={yjsstyle.yrightinput}/>
                                </Form.Item>
                                <Form.Item
                                    label="邮箱"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input   className={yjsstyle.yrightinput}/>
                                </Form.Item>
                                <Form.Item name="sex" label="性别">
                                <Radio.Group>
                                    <Radio value="0">男</Radio>
                                    <Radio value="1">女</Radio>
                                </Radio.Group>
                                </Form.Item>

                                <Form.Item>
                                    <Button className={yjsstyle.yrightbutton} type="primary" htmlType="submit">
                                    保存
                                    </Button>
                                    <Button className={yjsstyle.yrightbutton} type="primary" danger  onClick={()=>onFinishFailed()}>
                                    关闭
                                    </Button>
                                </Form.Item>
                                </Form>
                </div>:<div>
                <Form
                {...layout}
                name="basic"
                onFinish={onfixpassword}
                // onFinishFailed={onFinishFailed}
                >
                <Form.Item
                    label="旧密码"
                    name="oldPassword"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input className={yjsstyle.yrightinput}/>
                </Form.Item>
                <Form.Item
                    label="新密码"
                    name="newPassword"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input className={yjsstyle.yrightinput}/>
                </Form.Item>
                <Form.Item
                    label="确认密码"
                    name="newword"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input className={yjsstyle.yrightinput}/>
                </Form.Item>
                <Form.Item>
                    <Button className={yjsstyle.yrightbutton} type="primary" htmlType="submit">
                    保存
                    </Button>
                    <Button className={yjsstyle.yrightbutton} type="primary" danger onClick={()=>{
                        history.replace('/teachers/postSkill')
                    }}>
                    关闭
                    </Button>
                </Form.Item>
                </Form>
                </div>
            }
            </div>
        </section>
        </div>
    </div>
    </div>
}

export default observer(TeacherPersonCenter);