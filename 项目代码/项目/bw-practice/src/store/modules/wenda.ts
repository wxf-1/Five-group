import { all, classInfo, selectall, selectAnswerList, selectAnswerList2, wait } from '@/services/modules/wenda'
import { tan, WendaList } from '@/utils/interfaceWenda'
import {makeAutoObservable} from 'mobx'
function alllist(alllist:WendaList[]) {
    alllist.forEach(item=>item.flag=false)
    return alllist
}
class wenda{
    constructor(){
        makeAutoObservable(this)
    }
    //所有的数据
    allList:WendaList [] =[] 
    //选中的数据的id
    checkedId:string[]=[]
    AllChecked:boolean=false
    //班级信息
    async getClassInfo(){
        let result =await classInfo()
        return result.data[0].classname
    }
    //待处理问答
    async getwait(){
        let result = await wait()
        this.allList=result.rows
        return result.rows
    }
    //所有问答
    async getall(index:any){
        let result=await all(index)
        let result2=alllist(result.rows)
        this.allList=result2
        return result2
    }
    //改变flag (input 选中)
    async changeChecked(id:string){
        this.allList.map(item=>{
            if (item.answerId==id) {
                item.flag=!item.flag
            }
        })
        this.AllChecked=this.allList.every(item=>item.flag)
        return this.allList
    }
    //全选
    async allchecked(){
        this.AllChecked=!this.AllChecked
        this.allList.map(item=>item.flag=this.AllChecked)
        return this.allList
    }
    async selectAll(value:string){
        let result=await selectall(value)
        this.allList=result.rows
        return result.rows
    }
    //弹框
    async selectAnswerList(){
        let result= await selectAnswerList()
        return result.rows
    }
    async selectAnswerList2(data:tan){
        let result=await selectAnswerList2(data)
        return result.rows
    }
    //选中传入它的id
    async answerid(answerId:string){
        this.checkedId.push(answerId)
    }
    
}
export default new wenda