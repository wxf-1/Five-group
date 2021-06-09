import { addPlanClassList, getPlanClass, getViewPlanClass, getViewPlanRank } from "@/services"
import { IAddClassItem, IPlanClassItem, IPlanManageRank, IProgressItem } from "@/utils/interfacePlan"
import { makeAutoObservable } from "mobx"

class Plan{
    constructor(){
        makeAutoObservable(this)
    }
    //计划 班级数组
    planLabel:IPlanClassItem[]=[]
    //计划 班级
    async getPlanClass(){
        let result=await getPlanClass()
        // console.log(result,'resdtrrrrrrrrr');
        if(result.data){
            this.planLabel=result.data
            // console.log(this.planLabel);
            
        }
    }
    // //添加计划 班级数组
    // addPlanList:IAddClassItem[]=[]
    // //添加计划 列表
    // async addPlanClassList(id:string){
    //     let result=await addPlanClassList(id)
    //     // console.log(result,'ere');
    //     if(result.data){
    //         this.addPlanList=result.data
    //     }
    // }
    // tips=''
    // //删除计划
    // async delPlanItem(id:string){
    //     let result=await delPlanItem(id)
    //     console.log(result,'ere');
    //     if(result.code===200){
    //         this.tips=result.msg
    //     }
    // }
    
    getClassProgress:IProgressItem={}
    //计划管理 查看进度 获取班级
    async getViewPlanClass(classid:string,classPlanid:string){
        let result=await getViewPlanClass(classid,classPlanid)
        // console.log(result,'result');
        if(result.code===200){
            this.getClassProgress=result.data
        }
    }
    getClassRank:IPlanManageRank[]=[]
    //计划管理 查看进度 获取班级排行
    async getViewPlanRank(classid:string,classPlanid:string){
        let result=await getViewPlanRank(classid,classPlanid)
        // console.log(result,'result');
        if(result.code===200){
            this.getClassRank=result.data
        }
        
    }
    
}
export default new Plan