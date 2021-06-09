import { addDefence } from '@/services';
import { AddDefence } from '@/utils/interfacePrac';
import {makeAutoObservable} from 'mobx'
import { message } from 'antd'

class Defence{
    constructor(){
        makeAutoObservable(this)
    }
    async getAddDefence(params:AddDefence){
        let result=await addDefence(params);
        console.log(result,'add');
        if(result.code===200){
            message.success('保存答辩基本信息成功');
        }
        
    }
}

export default new Defence;