   import {getDetail} from '../../services/modules/interDetail'
   //跳详情
   class interDetail{
    detail: any;
    async getDetailto(params:any){
        console.log(params); 
        let result= await getDetail(params.interviewId)
        if (result.data) {
            this.detail=result.data
            return result.data.askAndanswerList[0]
        }
   }
}
export default interDetail