import {makeAutoObservable} from 'mobx'
import {ClassRankItem, SelectClassPlan, SelectClassPlanInit} from '@/utils/interfacePrac'
import {classRank, selectClassPlan,selectClassPlanInit} from '@/services'
class ViewPlan{
    constructor(){
        makeAutoObservable(this);
    }

    // 定义班级列表
    selectClassPlanList:SelectClassPlan[]=[];
    
    // 定义选择班级详情
    selectClassPlanDetail:SelectClassPlanInit={}

    // 定义选择班级成员排行榜
    classRankList:ClassRankItem[]=[]

    // 班级列表方法
    async getSelectClassPlanList(){
        let result=await selectClassPlan();
        // console.log(result,'+');
        
        if(result.data){
            this.selectClassPlanList=result.data;
        }
    }

    async getSelectClassPlanInit(classid:string,classPlanid:string){
        let result=await selectClassPlanInit(classid,classPlanid);
        // console.log(result,'result');
        if(result.code==200){
            this.selectClassPlanDetail=result.data
        }
        // console.log(this.selectClassPlanDetail,'this.selectClassPlanDetail');
        
    }

    async getClassRankList(classid:string,classPlanid:string){
        let result=await classRank(classid,classPlanid);
        console.log(result,'result');
        
        if(result.code==200){
            this.classRankList=result.data
        }
    }
}

export default new ViewPlan;