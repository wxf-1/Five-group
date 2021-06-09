//计划管理列表
export interface IPlanManageList {
    begintime: string;
    classId?: any;
    className: string;
    classid: string;
    countCompleted?: any;
    countStus: number;
    countUncompleted: number;
    description: string;
    endtime: string;
    id: string;
    planname: string;
    progress: string;
    states: string;
    surplusTime: string;
  }
  //计划管理列表参数
  export interface IPlanManage {
    classId: string;
    searchName: string;
    ifFinished: number;
    pageNum: number;
    pageSize: number;
  }
  //添加计划班级
  export interface IAddClassItem {
    avatar: string;
    classid: string;
    classname: string;
    createBy?: any;
    createTime?: any;
    id: string;
    params: object;
    remark?: any;
    searchValue?: any;
    updateBy?: any;
    updateTime?: any;
    userid: string;
    username: string;
  }
  // 进度下拉框选中详情
export interface SelectClassPlanInit {
    beginTime?: any;
    begintime?: string;
    className?: string;
    classid?: string;
    countCompleted?: any;
    countStus?: number;
    countUncompleted?: number;
    description?: string;
    endTime?: any;
    endtime?: string;
    id?: string;
    list?: any[];
    planname?: string;
    progress?: string;
    states?: string;
    stuRank?: any
  }
  //计划班级列表
  export interface IPlanClassItem {
    classname: string;
    collegeId?: any;
    createBy?: any;
    createTime?: any;
    id: string;
    majorId?: any;
    params: Params;
    remark?: any;
    searchValue?: any;
    updateBy?: any;
    updateTime?: any;
  }
  export interface IPlanItem {
    classId: string;
    searchName: string;
    ifFinished: number;
    pageNum: number;
    pageSize: number;
  }
  //计划和计划管理页列表数据
  export interface IPlanListItem {
    begintime: string;
    classId?: any;
    className: string;
    classid: string;
    countCompleted?: any;
    countStus: number;
    countUncompleted: number;
    description: string;
    endtime: string;
    id: string;
    planname: string;
    progress: string;
    states: string;
    surplusTime: string;
  }
  interface Params {
    [key:string]:any
  }
  //计划管理 查看进度 班级
 export  interface IProgressItem {
  beginTime?: any;
  begintime?: string;
  className?: string;
  classid?: string;
  countCompleted?: any;
  countStus?: number;
  countUncompleted?: number;
  description?: string;
  endTime?: any;
  endtime?: string;
  id?: string;
  list?: IListItem[];
  planname?: string;
  progress?: string;
  states?: string;
  stuRank?: any;
}
export interface IListItem {
  classid?: any;
  finished: number;
  groupProgress: number;
  groupname: string;
  id: string;
  members: number;
  unfinished: number;
  myProject:any[],
  stuList:any[],
}
//计划管理 查看进度 班级排行
export interface IPlanManageRank {
  endtime?: any;
  groupid?: string;
  groupname?: string;
  members?: any;
  num?: number;
  proList?: any;
  sProList?: any;
  studentUrl?: string;
  taskCompletedCount?: any;
  taskCompletedpProgress?: number;
  userid?: string;
  username?: string;
}