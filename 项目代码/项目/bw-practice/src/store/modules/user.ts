import { captchaImage, getlogin } from "@/services/modules/user"
import { setCookie } from "@/utils/auth"
import { makeAutoObservable } from "mobx"


class User{
    constructor(){
        makeAutoObservable(this)
    }
    captchaImages:RootObject={} as RootObject
    code:number=0
    async carimg(){
        let result = await captchaImage()
        console.log(result)
        this.captchaImages=result
        
    }
    async getLogin(params:RootObject){
       await getlogin(params).then(res=>{
            console.log(res);
            setCookie(res.token)
            this.code=res.code
        })
          return this.code
    }
}
export default new User