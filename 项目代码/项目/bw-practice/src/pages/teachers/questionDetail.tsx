import React, { useEffect, useState } from "react";
import useStore from "@/context/useStore";
import {observer} from 'mobx-react-lite';
import { Button,Checkbox, Input,Modal, Select,Pagination,message} from 'antd';
import {MessageOutlined,SearchOutlined,DownOutlined} from "@ant-design/icons";
import ystyle from "./questionDetail.less";
import classNames from 'classnames';
import Editor from 'for-editor';
import {IRouteComponentProps} from "umi";
import {upload,postanswer} from "@/services/modules/question"
// 自定义数组
let type=["全部","实训","面试","工作","其他","答辩","我的问答"];
let typename=["实训","面试","工作","其他","答辩"];
const QuestionDetail:React.FC<IRouteComponentProps>=({history})=>{
    const { Option } = Select;
    const [typenumber, settypenumber] = useState(0);
    const [quality, setquality]=useState<number>();
    const [authentication, setauthentication]=useState<number>();
    const [questionTitle, setquestionTitle]=useState("");
    const [questionTitles, setquestionTitles]=useState("");
    const [value,setvalue]=useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectone,setselectone]=useState("");//问题类型
    const [total,settotal]=useState(1);
    const [tags,setTags]=useState<string[]>([]);
    // 我要提问列表
    const [answertop,setanswertop]=useState("");//问题列表的问题
    const [text1,settext1]=useState("");//问题列表标题第二行第二个框
    const [text2,settext2]=useState('');//问题列表标题第二行第三个框
    // 底部input的value值
    const [taginput,settaginput]=useState("")

    // 修改标题部分下拉框的方法
    function changeselectone(value:string){
        setselectone(value);
    }
    // md文档添加图片的方法
    async function uploadImg(file: File){
        let form = new FormData();
        form.append('img', file);
        let result = await upload(form);
        console.log(result)
        let {path} = result.data[0];
        setvalue(`${value}![${file.name}](${path})`);
    }
    // 仓库的使用
    let {question}=useStore();
    // 进入页面请求全部数据
    useEffect(() => {
        let params={
            isAsc:"desc",
            pageNum: total,
            pageSize: 8,
            type:typenumber,
            quality,
            authentication,
            questionTitle,
        }
        question.questionlistfn(params);
    }, [typenumber,quality,authentication,questionTitle,total,isModalVisible])

// 添加标签的方法
    function addTags(taginput:string){
        let a=taginput;
        setTags([...tags,a])
    }
    return <div className={ystyle.maxbox}>
        <section className={ystyle.top}>
            <b className={ystyle.titletype}>类型</b>：{
                type.map((item,index)=>{
                    return <span 
                    key={index} 
                    className={index===typenumber? classNames(ystyle.topactive, ystyle.topspans) :ystyle.topspans}
                    onClick={()=>{
                        settypenumber(index);
                    }}
                    >{item}</span>
                })
            }
        </section>
        <section className={ystyle.next}>
            <div className={ystyle.nexttop}>
            <Checkbox onChange={()=>{
                if(quality==1){
                    setquality("" as unknown as number)
                }else{
                    setquality(1)
                }
                
            }} className={ystyle.onlycheckbox}>仅看精品</Checkbox>
            <Checkbox onChange={()=>{
                if(authentication==1){
                    setauthentication("" as unknown as number)
                }else{
                    setauthentication(1)
                }
            }}>仅看教师认证</Checkbox>
            <Input style={{width:"200px"}} placeholder="搜索问题" suffix={<SearchOutlined style={{
                color: '#DCDFE6',
                }}/>}
                onChange={(e)=>{
                    setquestionTitles(e.target.value)
                }}
                onKeyDown={(e)=>{
                    if(e.keyCode===13){   
                        setquestionTitle(questionTitles)
                    }
                }}/>
            <button className={ystyle.quiz} onClick={()=>{
                setIsModalVisible(true);
            }}>+我要提问</button>
                        <Modal title="提问" 
                        width="700px"
                        margin-top="50px"
                        visible={isModalVisible} 
                        onOk={()=>{setIsModalVisible(false);}} 
                        onCancel={()=>{setIsModalVisible(false);}} 
                        footer={null}
                        className={ystyle.modal}>
                            <p>标题</p>
                            {/* 问题列表的问题 */}
                            <Input  placeholder="请输入问题名称" value={answertop} onChange={(e)=>{
                                setanswertop(e.target.value);
                            }}/>
                            <div className={ystyle.titleinput}>
                            <Select style={{ width: '100px' }} placeholder="请选择问题类型"
                               onChange={changeselectone}
                               >
                                <Option value="实训">实训</Option>
                                <Option value="面试">面试</Option>
                                <Option value="工作">工作</Option>
                                <Option value="其他">其他</Option>
                            </Select>
                            {
                                selectone=="实训" || selectone=="面试"?
                                <div className={ystyle.selecttwo}>
                                {
                                    selectone=="实训"?<>
                                    <Input placeholder="请选择项目" suffix={<DownOutlined/>}/>
                                    <Input placeholder="请选择任务" suffix={<DownOutlined/>}/>
                                    </>:<>
                                    <Input placeholder="公司" value={text1} onChange={(e)=>{
                                        settext1(e.target.value)
                                    }}/>
                                    <Input placeholder="岗位" value={text2} onChange={(e)=>{
                                        settext2(e.target.value)
                                    }}/>
                                    </>
                                }
                            </div>
                               :
                                <div>
                                    <Input placeholder={selectone=="其他"?"其他":"工作"} value={text1} onChange={(e)=>{
                                        settext1(e.target.value)
                                    }}/>
                                </div>
                            }
                        
                            
                            </div>
                            <p>描述</p>
                            <Editor height="250px"  value={value} onChange={(value)=>{setvalue(value)}} addImg={(file, index)=>uploadImg(file)}/>
                            <p>标签</p>
                            <Input value={taginput} onChange={(e)=>{
                                settaginput(e.target.value)
                            }} placeholder="最多可以输入5个标签" onKeyDown={(e)=>{
                                if(e.keyCode==13){
                                    if(tags.length<6){
                                        addTags(taginput)
                                        settaginput("");
                                    }else{
                                        message.info('最多可输入5个标签')
                                    }
                                    
                                }
                            }}/>
                            <div>
                                {
                                    tags.map((item,index)=>{
                                       return <span key={index}>{item} <span onClick={()=>{
                                            tags.splice(index,1);
                                            setTags([...tags])
                                       }}>x</span></span>
                                    })
                                }
                            </div>
                            <div className={ystyle.releasediv}>
                            <Button type="primary" className={ystyle.release} onClick={()=>{
                                postanswer({questionTitle:answertop,questionContent:value,text1,text2,type:typename.indexOf(selectone),labels:tags})
                                setanswertop("");
                                setvalue("");
                                settext1("");
                                settext2("");
                                setTags([]);
                                setIsModalVisible(false);
                            }}>发布</Button>
                            </div>
                        </Modal>
            </div>
               {
                  question.questionlist.map((item,index)=>{
                    
                      return <div key={item.answerId} className={ystyle.listitem}>
                            <li className={ystyle.listitemli}>
                                <div className={ystyle.contextone}>
                                    <div>
                                    <span className={ystyle.answerone}>{item.qUserName}</span>
                                    <span className={ystyle.answertwo}>{item.replyTime}前发布</span>
                                    <span className={ystyle.answerone}>实训类型：<span className={ystyle.answertypes}>{typename[Number(item.typeNum)]}</span></span>
                              
                                    </div>
                                    <div>
                                    <MessageOutlined />{item.answerCount}
                                    </div>
                                </div>
                                <div  className={ystyle.contexttwo}>
                                    {
                                        item.quality?<img src="http://111.203.59.61:8060/static/img/boutique.fc46be52.svg" alt=""/>:null
                                    }
                                    {
                                        item.authentication?<img src="http://111.203.59.61:8060/static/img/authentication.c814dd7c.svg" alt=""/>:null
                                    }
                                 {/* 点击文字跳转到详情页 */}
                                    <span onClick={()=>{
                                        history.push(`/teachers/AnswerDetailManage?answerId=${item.answerId}`)  
                                    }}>{item.questionTitle}</span>
                                </div>
                                <div
                                onClick={(e)=>{
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log(e);
                                    
                                }} 
                                className={ystyle.contextthree}>
                                    
                                    <span className={item.flag?ystyle.active:""}>{item.questionContent}</span>
                                    <span className={ystyle.contextthreespan} onClick={()=>{
                                        item.flag=!item.flag
                                        
                                    }}>查看全部</span>
                                </div>
                                <div className={ystyle.buttontag}>
                                        {
                                            item.labels.map((item,index)=>{
                                                return <Button className={ystyle.buttons} key={index}>{item}</Button>          
                                            })
                                        }
                                </div>
                            </li>
                            <div>
                          {/* 点击跳转到详情页 */}
                            <div className={ystyle.answerbutton} onClick={()=>{    
                               history.push(`/teachers/AnswerDetailManage?answerId=${item.answerId}`)  
                            }}>回答</div>
      
        
                            </div>

                      </div>
                  })
               }
               <div className={ystyle.footer}>
               <Pagination 
               defaultCurrent={1} 
               defaultPageSize={8} 
               total={question.questiontotal} 
               showSizeChanger={false}
               onChange={(current)=>{                
                settotal(current);
               }}
               />
               </div>
        </section>
    </div>
}
export default observer(QuestionDetail);