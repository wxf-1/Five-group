import { makeAutoObservable } from "mobx";

class Global{
    constructor(){
        makeAutoObservable(this)
    }
    isloading:boolean=false
    showLoading(){
        this.isloading = true
    }
    hideLoading(){
        this.isloading = false
    }
}

export default new Global