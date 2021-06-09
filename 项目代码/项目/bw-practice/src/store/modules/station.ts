import { addPostSkill, getSkillDetail, getSkillLabel } from '@/services';
import { deleteSkill, getStationSkillDetail, inintSkill, putSkill, selectSkillList } from '@/services/modules/station';
import { ISkillAddItem, ISkillDescriptionListItem, iSkillListSkill } from '@/utils/interface'
import {makeAutoObservable} from 'mobx'


function setKeyById(array: ISkillDescriptionListItem[]){
    array.forEach(item=>{
        item.key = item.id;
        if (item.children){
            setKeyById(item.children)
        }
    })
}

class station{
    constructor(){
        makeAutoObservable(this)
    }
    //技能要求列表
    skillList:ISkillDescriptionListItem[]=[]
    // //技能搜索结果
    // skill:iSkillListSkill ={} as iSkillListSkill 
    // 当前技能详情
    skillDetail: iSkillListSkill = {} as iSkillListSkill;

    //获取技能要求
    async selectSkillList(stationVersionId:string,searchTitle:string=''){
        let result = await selectSkillList(stationVersionId,searchTitle)
        if(result.data){
            let skillList=result.data
            setKeyById(skillList);
            this.skillList = skillList;
        }
    }
    //顶层技能要求
    async inintSkill(stationVersionId:string, parentId= '0'){
        console.log('......',stationVersionId,parentId);
        
        let result=await inintSkill(stationVersionId,parentId)
        if(result.data){
            let skillList = result.data.labelTreeIdList;
            setKeyById(skillList);
            this.skillList = skillList;
        }
    }
        // 删除技能
        async deleteSkill(skillId:string){
            let result = await deleteSkill(skillId);
            if (result.data){
                let skillList = result.data;
                setKeyById(skillList);
                this.skillList = skillList;
            }
        }
    
        // 获取当前技能详情
        async getStationSkillDetail(skillId:string){
            let result = await getStationSkillDetail(skillId)
            if (result.data){
                this.skillDetail = result.data;
            }
        }
    
        // 本地修改当前技能的label
        modifySKillDetail(params: {[key:string]: string|number}){
            this.skillDetail = {...this.skillDetail, ...params}
            console.log('params...', params, this.skillDetail);
        }
    
        // 修改服务端
        async putSkill(){
            let result = await putSkill(this.skillDetail)
            if (result.data){
                this.skillDetail = result.data;
                // this.selectSkillList(this.skillDetail.stationVersionId);
            }
        }   
}
export default new station