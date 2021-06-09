import { deleteInterview, getDetail, getinterviewManage, interviewManage } from '@/services/modules/interview'
import { interfaceList } from '@/utils/interfaceView'
import {makeAutoObservable} from 'mobx'

class interview{
    constructor(){
        makeAutoObservable(this)
    }

    inlist:interfaceList[] = [] 
    detail= {} as interfaceList
    id:string=''
    async interviewManage(){
        let result=await interviewManage()
        if (result.rows) {
            this.inlist=result.rows
        }
    }
    async deleteinterview(interviewId:string,status:number){
        let result=await deleteInterview(interviewId,status)
    }
    //跳详情
    async getDetailto(params:any){
        console.log(params); 
        let result= await getDetail(params.interviewId)
        if (result.data) {
            this.detail=result.data
            return result.data.askAndanswerList[0]
        }
    }
    //模糊搜索
    async getInterview(searchTitle:string){
        let result=await getinterviewManage(searchTitle)
        console.log(result.rows);
        this.inlist=result.rows
    }

}
export default new interview