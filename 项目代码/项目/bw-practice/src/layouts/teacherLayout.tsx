import React, { useEffect } from 'react'
import { getLocale, IRouteComponentProps, Link, NavLink, setLocale, useIntl } from 'umi'
import { Layout, Menu, Dropdown, Popover, Badge, Spin,Select,Avatar } from 'antd'
import { BellOutlined,DownOutlined} from '@ant-design/icons';
import {observer} from 'mobx-react-lite'
import useStore from '@/context/useStore';
// 引入面包屑
import Breadcrumb from '@/components/breadcrumb';
import './teacherLayout.less'
const { Header, Footer, Content } = Layout
const menu1 = (
    <Menu>
        <Menu.Item>
            <NavLink to='/teachers/planList'>计划</NavLink>
        </Menu.Item>
        <Menu.Item>
            <NavLink to='/teachers/viewPlan'>进度</NavLink>
        </Menu.Item>
        <Menu.Item>
            <NavLink to='/teachers/defence'>答辩</NavLink>
        </Menu.Item>
        <Menu.Item>
            <NavLink to='/teachers/planListManage'>计划(管理)</NavLink>
        </Menu.Item>
    </Menu>
);

const menu2 = (
    <Menu>
        <Menu.Item>
            <NavLink to='/teachers/interviewList'>面试记录</NavLink>
        </Menu.Item>
        <Menu.Item>
            <NavLink to='/teachers/interviewManage'>面试记录管理</NavLink>
        </Menu.Item>
        <Menu.Item>
            <NavLink to='/teachers/rankList'>面试排行榜</NavLink>
        </Menu.Item>
    </Menu>
);
const menu3 = (
    <Menu>
        <Menu.Item>
            <NavLink to='/teachers/questionDetail'>问答列表</NavLink>
        </Menu.Item>
        <Menu.Item>
            <NavLink to='/teachers/questionHandle'>问答管理</NavLink>
        </Menu.Item>
    </Menu>
)

const contents = (
    <Menu>
        <Menu.Item>
            <NavLink to='/teachers/teacherPersonCenter'>个人中心</NavLink>
        </Menu.Item>
        <Menu.Item>
            <NavLink to='/teachers/needHandle'>我的代办</NavLink>
        </Menu.Item>
        <Menu.Item>
            <NavLink to="/login">退出</NavLink>
        </Menu.Item>
    </Menu>
);
const teacherLayout: React.FC = (props) => {
    let {teacherPersonCenter}=useStore();
    // console.log(teacherPersonCenter);
    useEffect(() => {
        teacherPersonCenter.questionlistfn()
      }, [])
    window.document.title='八维教育'
    const { global } = useStore()
    const intl = useIntl();
    return <Layout>
        <Spin spinning={global.isloading} tip="加载中" size="large">
            <Header> 
                <div className='headerleft'>
                    <img className="img1" src="http://111.203.59.61:8060/static/img/w_bw.172a76e5.png" alt="" />
                    <NavLink to='/teachers/postSkill'> { intl.formatMessage({
                        id:'header-postSkill'
                    })}</NavLink>
                    <NavLink to='/teachers/postproject'> {intl.formatMessage({
                        id:'header-proManagement'
                    })}</NavLink>
                    <Dropdown overlay={menu1}><span>实训</span></Dropdown>
                    <Dropdown overlay={menu2}><span>面试</span></Dropdown>
                    <Dropdown overlay={menu3}><span>问答</span></Dropdown>
                    <Select value={getLocale()} onChange={value=>setLocale(value, false)}>
                        <Select.Option value="en-US">English</Select.Option>
                        <Select.Option value="zh-CN">中文</Select.Option>
                    </Select>   
                    <Popover placement="bottom">
                        <Badge count={5} >
                            <BellOutlined />
                        </Badge>
                    </Popover>
        {/* 右测的头像部分 */}
                    <Popover content={contents} title="" className="topprompt">
                        <img className="imgtop" src={`http://111.203.59.61:8060${teacherPersonCenter.userlist.avatar}`} alt=""/>
                        <span>{teacherPersonCenter.userlist.userName}</span>
                    </Popover>
                </div>
            </Header>
            <Breadcrumb/>
            <Content> {props.children} </Content>
            <Footer>
                <div className="bw_bottom">
                    <div className="b_b_detail">
                        <div className="b_b_left">
                            <div className="bw_img">
                                <img src="http://111.203.59.61:8060/static/img/bottom_logo.c8aa9859.png" alt="" />
                            </div>
                            <div className="b_w_tel">
                                400-008-0987
                    </div>
                        </div>
                        <div className="b_b_middle">
                            <div className="middle_one middle">
                                <div className="middle_title">
                                    走进八维
                    </div>
                                <div className="href_a">
                                    <a href="http://bwie.cn/bwie/about.html">集团概况</a>
                                </div>
                                <div className="href_a">
                                    <a href="http://bwie.cn/bwie/news/index.html">八维动态</a>
                                </div>
                                <div className="href_a">
                                    <a href="http://bwie.cn/bwie/lead.html">领导关怀</a>
                                </div>
                                <div className="href_a">
                                    <a href="http://bwie.cn/bwie/honour.html">企业荣誉</a>
                                </div>
                            </div>
                            <div className="middle_two middle">
                                <div className="middle_title">
                                    八维文化
                    </div>
                                <div className="href_a">
                                    <a href="http://bwie.cn/bwie/culture.html">八维理念</a>
                                </div>
                                <div className="href_a">
                                    <a href="http://bwie.cn/bwie/spirit.html">八维精神</a>
                                </div>
                                <div className="href_a">
                                    <a href="http://bwie.cn/bwie/dak.html">文化驿站</a>
                                </div>
                            </div>
                            <div className="middle_three middle">
                                <div className="middle_title">
                                    社会责任
                               </div>
                                <div className="href_a">
                                    <a href="http://bwie.cn/bwie/duty/public.html">社会公益</a>
                                </div>
                                <div className="href_a">
                                    <a href="http://bwie.cn/bwie/duty/great.html">大善之举</a>
                                </div>
                            </div>
                            <div className="middle_four middle">
                                <div className="middle_title">
                                    联系我们
                    </div>
                                <div className="href_a">
                                    <a href="http://bwie.cn/bwie/partners.html">业务合作</a>
                                </div>
                                <div className="href_a">
                                    <a href="http://bwie.cn/bwie/sign_up.html">咨询报名</a>
                                </div>
                                <div className="href_a">
                                    <a href="http://bwie.cn/bwie/concact.html">联系方式</a>
                                </div>
                            </div>
                        </div>
                        <div className="b_b_right">
                            <img src="http://111.203.59.61:8060/static/img/wechat.e60a83ec.png" alt="" />
                            <div className="wechat_text">
                                八维微信公众号
                    </div>
                        </div>
                    </div>
                    <div className="b_b_sign">
                        京公网安备 11010802031438号 &copy; Copyright 2020. 八维教育版权所有 | 京ICP备12008262号-12
                </div>
                </div>
            </Footer>
        </Spin>
    </Layout>
}
export default observer(teacherLayout)