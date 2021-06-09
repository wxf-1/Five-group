import { questionanswerlist} from "@/utils/questionface"
import {makeAutoObservable} from "mobx";
import {getlist} from "@/services/modules/question"
import {questionanswer} from '@/utils/questionface'
class question{
    constructor(){
        makeAutoObservable(this);
    }
    // 定义展示的数据
    questionlist:questionanswerlist[]=[];
    questiontotal=0;
    // 请求展示数据
    async questionlistfn(params:questionanswer){
        if(params.type-1<0){
            params.type="" as unknown as number
        }else{
            params.type=params.type-1;
        }
        let result=await getlist(params);
        if(result.rows){
          let rows=result.rows.map((item:questionanswerlist)=>{
                return {...item,flag:false}
            })
            this.questionlist=rows;
            // console.log();
            
            this.questiontotal=result.total;
        }
    }
}
export default new question;