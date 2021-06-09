
import {makeAutoObservable} from "mobx";
import {getuserlist,changepassword} from "@/services/modules/teacherPersonCenter";
import {teacherpersoncenter,password} from "@/utils/questionface"
class question{
    constructor(){
        makeAutoObservable(this);
    }
    // 定义展示的数据
    userlist={} as teacherpersoncenter;
    // 图片地址
    imgurl="";
    // 请求展示数据
    async questionlistfn(){
        let result = await getuserlist();
        // console.log(result);
        
        if(result.user){
            this.userlist=result.user;
            this.imgurl=`http://111.203.59.61:8060${result.user.avatar}`;
        }
    }
    async changepassword(data:password){
        let result=await changepassword(data);
        if(result.code){
            return result.code
        }
    }

}
export default new question;