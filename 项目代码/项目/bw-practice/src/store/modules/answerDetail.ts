import { addAnswerEditor, addBoutique, anserDetailComment, answerAuthentication, answerDetails, remoteBoutique, removeAnswer, removeOnChange, ResponsevisbleTable, shielOnChange} from '@/services/modules/answerDetail';
import {makeAutoObservable} from 'mobx';
import {AnswerDetailList,ISAnswerDetailIte,ISAnswerCommentList, Responsevisble, ResponsevisbleItem} from '@/utils/answerDetailface';
interface answerEdit{
   answerId: string,questionValue:string
}
class AnswerDetail{
   constructor(){
     makeAutoObservable(this);
   }

   answerList:AnswerDetailList={} as AnswerDetailList;
   answerCommentList:ISAnswerCommentList[]=[];
   answerCode:number = 0;
   ResponsevisbleTableList: ResponsevisbleItem[] = [];
   total:number=0;

   async answerDetails(answerDetailID: string){
       let result = await answerDetails(answerDetailID);
       if(result.data){
           this.answerList=result.data
       }
   } 

   async anserDetailComment(parquery:ISAnswerDetailIte){
    let result = await anserDetailComment(parquery)
    if(result.rows){
       this.answerCommentList=result.rows
       this.total=result.total
    }
   }
   //添加认证
   async answerAuthentication(paramsReplyId:string){
     let result = await answerAuthentication(paramsReplyId)
      if(result.data){
         this.answerCode=result.code
      }
   }



   //撤销认证
   async removeAnswer(replyId:string){
       let result = await removeAnswer(replyId);
       if(result.data){
         this.answerCode=result.code
      }
    }


   //设为精品
   async addBoutique(answerDetailID:string){
       let result =await addBoutique(answerDetailID);
       if(result.data){
         this.answerCode=result.code
      }
    }


    //取消精品
    async remoteBoutique(answerDetailID:string){
      let result =await remoteBoutique(answerDetailID);
      if(result.data){
        this.answerCode=result.code
     }
   }

   //屏蔽评论
   async shielOnChange(replyId:string){
      let result =await shielOnChange(replyId);
      if(result.data){
        this.answerCode=result.code
     }
   }

   //取消屏蔽评论
   async removeOnChange(replyId:string){
      let result =await removeOnChange(replyId);
      if(result.data){
         this.answerCode=result.code
      }
   }

   //发布评论
   async addAnswerEditor(answrParams: answerEdit){
      let result = await addAnswerEditor(answrParams);
      if(result.code==200){
         this.answerCode=result.code
      }
   }
 
   //Table表格
   async ResponsevisbleTable(parTable:Responsevisble){
      let result = await ResponsevisbleTable(parTable)
      if(result.code==200){
         this.ResponsevisbleTableList=result.rows
      }
   }

}

export default new AnswerDetail


