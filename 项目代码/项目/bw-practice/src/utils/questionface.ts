// 请求数据的参数
export interface questionanswer{
    isAsc:string,
    pageNum:number,
    pageSize:number,
    type:number,
    questionTitle?:string,
    quality?:number,
    authentication?:number,
}
// 请求数据返回的数据
export interface questionanswerlist {
  answerId: string;
  proId: string;
  taskId: string;
  stepId?: any;
  qUserId: string;
  qUserName: string;
  qUserLevel?: any;
  createTime: string;
  taskName?: any;
  rUserId?: any;
  rUserName?: any;
  rUserLevel?: any;
  questionTitle: string;
  questionContent: string;
  answerCount: number;
  favorCount?: any;
  unSupportCount: number;
  supportCount: number;
  type?: any;
  typeNum: string;
  replyTime: string;
  labels: string[];
  avatar?: any;
  replyContext?: any;
  shield: number;
  quality: number;
  replyId?: any;
  className?: any;
  authentication: number;
  collection: number;
  supportUp?: any;
  unsupportDown?: any;
  supportUpB: boolean;
  unsupportDownB: boolean;
  flag:boolean;
}
export interface editorfase{
  preview:boolean,
}
// 个人中心部分的请求
export interface teacherpersoncenter {
  searchValue?: any;
  createBy: string;
  createTime: string;
  updateBy?: any;
  updateTime?: any;
  remark?: any;
  params: Params;
  userId: number;
  deptId: number;
  userName: string;
  nickName: string;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  salt?: any;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate?: any;
  dept: Dept;
  roles: Role[];
  roleIds?: any;
  postIds?: any;
  majorName: string;
  admin: boolean;
}

interface Role {
  searchValue?: any;
  createBy?: any;
  createTime?: any;
  updateBy?: any;
  updateTime?: any;
  remark?: any;
  params: Params;
  roleId: number;
  roleName: string;
  roleKey: string;
  roleSort: string;
  dataScope: string;
  status: string;
  delFlag?: any;
  flag: boolean;
  menuIds?: any;
  deptIds?: any;
  admin: boolean;
}

interface Dept {
  searchValue?: any;
  createBy?: any;
  createTime?: any;
  updateBy?: any;
  updateTime?: any;
  remark?: any;
  params: Params;
  deptId: number;
  parentId: number;
  ancestors?: any;
  deptName: string;
  orderNum: string;
  leader: string;
  phone?: any;
  email?: any;
  status: string;
  delFlag?: any;
  parentName?: any;
  children: any[];
}

interface Params {
}

// 修改密码时的接口
export interface password {
  oldPassword:string,
  newPassword:string,
}