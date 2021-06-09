import useStore from "@/context/useStore"
import React, { useEffect, useState } from "react"
import { Input ,Button,Switch,Modal,Table,Divider,Checkbox   } from "antd";
import { SearchOutlined,DownOutlined} from '@ant-design/icons';
import classNames from "classnames";
import { deleteQuality, Quality, replyRightAnswer, upload } from "@/services/modules/wenda";
import style from './questionHandle.less'
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import Editor from 'for-editor' 
interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }
const {Search}=Input
const status=['全部','精品','认证','被屏蔽']
const selectWenda=['待处理问答','所有问答']
const wendaType=[
    {"text":"全部",type:""},
    {"text":"实训",type:"0"},
    {"text":"答辩",type:"4"},
    {"text":"面试",type:"1"},
    {"text":"工作",type:"2"},
    {"text":"其他",type:"3"}
]
const columns = [
    {
        title: '问题名称',
        dataIndex: 'questionTitle',
    },
    {
        title: '类型',
        dataIndex: 'typeName',
    },
    {
        title: '发起人',
        dataIndex: 'author',
    },
    {
        title: '发起时间',
        dataIndex: 'createTime',
    },
    {
        title: '来源',
        dataIndex: 'source',
    }
  ];
const questionHandle: React.FC=()=>{
    const {wenda,global} =useStore()

    const [classname,setClassname]=useState<string>('')
    const [data,setData]=useState<WendaList[]>([])
    const [value,setValue]=useState<string>('')
    const [visible, setVisible] = useState(false);
    const [dataSource,setDataSource]=useState<[]>([])
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const [carIndex,setCarIndex]=useState<number>(1)
    const [carIndex2,setCarIndex2]=useState<number>(0)
    const [carIndex3,setCarIndex3]=useState<string>("")
    //控制弹框
    const [isModalVisible, setIsModalVisible] = useState(false);
    //控制弹框
    const [isModalVisivle2,setIsModalVisivle2]=useState(false)
    //mditor的value值
    const [mdvalue,setMdvalue]=useState<string>('')
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };
    //初始化获取班级和列表数据
    useEffect(() => {
        global.showLoading()
        wenda.getClassInfo().then(res=>{
            setClassname(res)
        })
        wenda.getall(carIndex2).then(res=>{
            setData(res)
        })
        wenda.selectAnswerList().then(res=>{
            setDataSource(res)
        })
        global.hideLoading()
    }, [])
    //切换数据(待处理问答/所有问答)
    function changeList(index:number){
        setCarIndex(index)
        if (index==1) {
            wenda.getall(carIndex2).then(res=>{
                setData(res)              
            })
        }else{
            wenda.getwait().then(res=>{
                setData(res)             
            })
        }
        console.log(data);
    }
    //切换屏蔽
    function onChangeShield(shield: number): void {
        console.log(shield);
    }    
    //设置精品
    function changeQuality(answerId:string,quality:number){
        if (quality==0) {
            Quality(answerId)
        }else{
            deleteQuality(answerId)
        }
        wenda.getall(carIndex2).then(res=>{
            setData(res)
        })
    }
    //切换状态类型
    function changeStatus(index:number){
        setCarIndex2(index)
        wenda.getall(index).then(res=>{
            setData(res)              
        })
    }
    //切换弹框中的类型
    function changeindex3(index:string){
        setCarIndex3(index)
        let params={index,isRight:0,questionTitle:''}
        console.log(typeof params);
        
        wenda.selectAnswerList2(params).then(res=>{
            setDataSource(res)
        })
    }
    //弹框中的仅看有答案
    function onChangeCheckbox(e:any){
        let isRight=Number(e.target.checked)
        let params={carIndex3,isRight,questionTitle:''}
        wenda.selectAnswerList2(params).then(res=>{
            setDataSource(res)
        })
    }
    //弹框中模糊搜索问答
    function onChangequestionTitle(value:string){
        let params={carIndex3,isRight:0,questionTitle:value}
        wenda.selectAnswerList2(params).then(res=>{
            setDataSource(res)
        })
    }
    //选中
    function changCheckbox(id:string){
        wenda.changeChecked(id).then(res=>{
            setData(res)
        })
    }
    //全选
    function changeAll(){
        wenda.allchecked().then(res=>{
            setData(res)
        })
    }
    //批量回答 
    function piliang(){
       let fla= data.some(item=>item.flag)
       console.log(fla);
       if (!fla) {
          setIsModalVisible(true)
          setIsModalVisivle2(true)
       }
    }
    async function uploadImg(file: File){
        let form = new FormData();
        form.append('img', file);
        let result =await upload(form);
        console.log(result)
        let {path} = result.data[0];
        setMdvalue(`${value}![${file.name}](${path})`);
    }
    // 批量回答 弹框确认
    function handleOk1(){
        setIsModalVisible(false)
    }
    function handleOk2(){
        setIsModalVisivle2(false)
    }
    //提交回答
    function submitOK(){
        let newarr:string[]=[]
        data.forEach(item=>{
            if (item.flag) {
                newarr.push(item.answerId)
            }
        })
        replyRightAnswer({questionIdList:newarr,replyContext:mdvalue}).then(res=>{
            if (res.code==200) {
                setIsModalVisivle2(false)
            }
        })
    }
    return <div className={style.management}>
         <section>
                <div className={style.Headers}>
                    <span>来源: <span className={style.active}>{classname} </span> </span>
                </div>
                <div className={style.Headers}> <span>状态:</span>
                    {status.map((item,index)=>{
                        return <span key={index} className={carIndex2==index? classNames(style.active) :''} onClick={()=>changeStatus(index)}  >{item}</span>
                    })}
                </div>
                <div className={style.content}>
                    <div className={style.wenda}>
                        {
                            selectWenda.map((item,index)=>{
                                return <span key={index}  className={carIndex==index? classNames(style.active) :''}  onClick={()=>changeList(index)}>  <b> {item}</b>  </span>
                            })
                        }
                    </div>
                    <div className={style.contentH}>
                        <span>
                            <input type="checkbox" checked={wenda.AllChecked} onChange={()=>changeAll()}/>全选
                        </span>
                        <span>
                            <Button className={style.buttons} onClick={()=>piliang()}>批量问答</Button>
                            <Button className={style.buttons}>批量选择相似问题答案</Button>
                            <Input className={style.search} style={{ width: 150,height:'40px'}}  placeholder="搜索问答" suffix={<SearchOutlined onClick={()=>{
                                 wenda.selectAll(value).then(res=>{
                                    setData(res)           
                                })
                            }}/>} 
                                onKeyDown={(e)=>{
                                    if (e.keyCode==13) {
                                        wenda.selectAll(value).then(res=>{
                                            setData(res)           
                                        })
                                    }
                                }}
                                onInput={(e)=>{
                                    setValue(e.target.value)
                                }}
                                />
                        </span>
                    </div>
                    <div className={style.allList}>
                            <div> {
                                      data.map((item,index)=>{
                                          return <div key={index} className={style.item}>
                                              <div className={style.itemLeft}>
                                                  <span> {item.className} </span>
                                                  <span> {item.qUserName} </span>
                                                  <span> {item.replyTime} </span>
                                                  <span> 实训类型 : <span className={style.mianshileixing}>{item.typeNum=='0'?'实训':"面试"} </span></span>
                                                  <div>
                                                      {
                                                          item.quality ? <img src="http://111.203.59.61:8060/static/img/boutique.fc46be52.svg" alt="" />
                                                          :null
                                                      }
                                                      <img src="http://111.203.59.61:8060/static/img/authentication.c814dd7c.svg" alt="" />
                                                      <span > <Link to={`/teachers/AnswerDetailManage?answerId=${item.answerId}`} > {item.questionTitle} </Link> </span>
                                                  </div>
                                                  <input type="checkbox" className={style.dingwei} checked={item.flag} onChange={()=>changCheckbox(item.answerId)}/>
                                                  <p> {item.questionContent} </p>
                                                  {
                                                      item.labels.map((item,index)=>{
                                                          return <Button key={index} className={style.wenButton}> {item} </Button>
                                                      })
                                                  }
                                                  <div className={style.Button_huida}>
                                                      <Button type="primary">问答 </Button>
                                                      <Button type="primary" onClick={() => setVisible(true)}>选择其他有 "正确答案" 的类似问题 </Button>
                                                      <Button danger onClick={()=>changeQuality(item.answerId,item.quality)}> { item.quality ? '取消精品' :'设为精品'}</Button>
                                                  </div>
                                              </div>
                                              <div className={style.itemRight}>
                                                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABMUlEQVQ4T2NkoDJgBJn3/////9Qyl/YGTpuzhuHtu48kOZiJiZkhMymQQUiInwHFhY2dc0H+Z2BiAgsTDUABBgq1mtJENAM75jAE+Tky6GopE20YTGFjxxwGaSkxTAMjQ9wY1FTkyDJQSlKUjgZu23WM4fS5awz1FSlg1z57+YZh9vwN4HBiZmYGi4G86etpy2Ckrw5m43UhSAEIpMYFMEhJiTB0T1zM8O37TwYpSRGG1PgAhp17jjOcOHOVgYmJiaG2LImwgWBXPXsDNgwGbt15hBK+9+8/YVBUlIG7lr5hSGo0EwxDqhkIMsjMSIto8zzdrHCHISwpEG0aVKGwEB/D23efMJMNqQaB1Lf1LGD4/ecPWCtGLJNjILKvqGYgyNCJ01cwRIV4ouZlcl2IrA8Abo7Ck35b2UQAAAAASUVORK5CYII=" alt="" />
                                                   <span>  {  item.answerCount  } </span>
                                                  <p>
                                                      <span className={style.chakanquanbu}>查看全部 <DownOutlined /></span>
                                                    <Switch defaultChecked={Boolean(item.shield)} onClick={()=>onChangeShield(item.shield)} />
                                                  </p>
                                                  
                                              </div>
                                          </div> 
                                      })
                                  }
                              </div>                         
                        <Modal
                            title="选择其它有“正确答案”的类似问题"
                            centered
                            cancelText="取消"
                            visible={visible}
                            onOk={() => setVisible(false)}
                            onCancel={() => setVisible(false)}
                            width={1000}
                        >
                     
                            <div className={style.wendaType}>
                                <span>类型:</span>
                                {
                                    wendaType.map((item,index)=>{
                                        return  <span key={index} 
                                        className={carIndex3==item.type? classNames(style.active, style.wendatypespan) : classNames(style.wendatypespan)}
                                             onClick={()=>changeindex3(item.type)}
                                        >{item.text}</span>
                                    })
                                }
                            </div>
                            <div className={style.jinkan}>
                                <Checkbox onChange={onChangeCheckbox}>仅显示有正确答案</Checkbox>
                                <Input placeholder="搜索问题" suffix={<SearchOutlined />} className={style.Jininput} onKeyDown={(e)=>{
                                    if (e.keyCode==13) {
                                        onChangequestionTitle(e.target.value as unknown as string)
                                    }
                                }}/>
                            </div>
                               <Divider />
                               <Table
                                    rowKey='answerId'
                                    columns={columns}
                                    rowSelection={{
                                        type: selectionType,
                                        ...rowSelection,
                                      }}
                                    dataSource={dataSource}
                                />
                        </Modal>
                    </div>
                </div>
                       {/* 批量回答 --未选中弹框 */}
                        <Modal title="提示" visible={isModalVisible} okText='确认' cancelText='取消'  onOk={handleOk1} onCancel={handleOk1} >
                                 <p>请勾选问题之后再进行操作</p>
                        </Modal>
                      {/* 批量回答 --选中弹框 md文档*/}
                        <Modal title="提示" width="900px" visible={isModalVisivle2} okText='确认' cancelText='取消'  onOk={submitOK} onCancel={handleOk2} >
                                <Editor height="500px" value={mdvalue} onChange={(value)=>{setMdvalue(value)}} addImg={(file, index)=>uploadImg(file)}/>
                        </Modal>
         </section>
    </div>
}
export default observer(questionHandle)
