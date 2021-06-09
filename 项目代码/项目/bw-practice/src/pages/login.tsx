import { IRouteComponentProps } from "@umijs/renderer-react"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import {Form,Input,Radio,Checkbox,Button} from 'antd'
import styles from './login.less'
import useStore from "@/context/useStore"
import { removeCookie } from "@/utils/auth"
const Login:React.FC<IRouteComponentProps>=({history,location})=>{
    const {user}=useStore()
    useEffect(() => {
        removeCookie()
        user.carimg().then(res=>{
            console.log(res);
        })
    }, [])
    function onFinish(value:any){
        delete value.remember
        let uuid=user.captchaImages.uuid
        let params={...value,uuid}
        user.getLogin(params).then(res=>{
            if (res==200) {
                if (location.query.redirect){
                    history.replace(decodeURIComponent(location.query.redirect as string));
                }else{
                    history.replace('/');
                }
            }
        })
    }
    return <div className={styles.login}>
    <Form
        className={styles.login_form}
        initialValues={{username: '郭老师', password: '123456', remember: true, key: 'teacher' }}
        onFinish={onFinish}
    >
        <h2 className={styles.h2}>八维生产特性实训平台</h2>
        <Form.Item
            name="username"
            rules={[{ required: true, message: '正确输入用户名!' }]}
        >
            <Input placeholder='账号' />
        </Form.Item>

        <Form.Item
            name="password"
            rules={[{ required: true, message: '正确输mmmm!' }]}
            className={styles.items}
        >
            <Input.Password  className={styles.psd} placeholder='密码'/>
        </Form.Item>
        {/* 验证码 */}
        <div style={{ display: "flex" }}>
            <Form.Item style={{ width: "250px" }}
                name='code'
                rules={[{ required: true, message: '正确输入验证码!' }]}>
                <Input  placeholder='验证码'/>
            </Form.Item>
            {user.captchaImages.img?<img src={`data:image/gif;base64,${user.captchaImages.img}`} style={{ width: "150px", height: "40px" }} alt="" onClick={()=>user.carimg()} />:null}
        </div>

        <Form.Item name="remember" valuePropName="checked" className={styles.rember}>
            <Checkbox className={styles.jizhuwo}> <span className={styles.fontrem}>记住我</span> </Checkbox>
        </Form.Item>

        <Form.Item name="key" className={styles.radios}>
            <Radio.Group>
                <Radio value="teacher">老师</Radio>
                <Radio value="student">学生</Radio>
            </Radio.Group>
        </Form.Item>

        <Form.Item >
            <Button type="primary" htmlType="submit" size='large' className={styles.buttonSub}>
                登录
            </Button>
        </Form.Item>
    </Form>
</div>
}
export default observer(Login)