/*
 * @Author: Yuanshuqin 
 * @Date: 2021-06-01 20:39:09 
 * @Last Modified by:   Yuanshuqin 
 * @Last Modified time: 2021-06-01 20:39:09 
 */
// 班级列表
export interface SelectClassPlan {
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
  surplusTime?: any;
}

//答辩 专业列表参数
export interface DefenceListParam {
  pageNum: number;
  pageSize: number;
  searchTitle?: any;
  defenceMjorId?: string;
  defenceStatus?: any;
}

//答辩 专业列表
export interface DefenceListItem {
  avaScore?: any;
  className: string;
  defenceAdress?: any;
  defenceAuthor: string;
  defenceAuthorName: string;
  defenceClassId?: any;
  defenceCreateTime: string;
  defenceEndTime: string;
  defenceGroupInfoList?: any;
  defenceHistoryId?: any;
  defenceId: string;
  defenceMajorId?: any;
  defencePlanId?: any;
  defenceRater?: any;
  defenceScore?: any;
  defenceScoreList?: any;
  defenceStatus: number;
  degenceName: string;
  groupName?: any;
  majorName: string;
  planName: string;
  projectName?: any;
  raterName?: any;
  scoreId?: any;
  taskName?: any;
  taskProgressId?: any;
}

// 进度 下拉框选中详情
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
  groupname?: any;
  id?: string;
  list?: any[];
  planname?: string;
  progress?: string;
  states?: string;
  stuRank?: any
}

// 进度 选中班级排行榜
export interface ClassRankItem {
  endtime: string;
  groupid: string;
  groupname: string;
  members?: any;
  num: number;
  proList?: any;
  sProList?: any;
  studentUrl: string;
  taskCompletedCount?: any;
  taskCompletedpProgress: number;
  userid: string;
  username: string;
}

// 添加答辩 班级
export interface ClasssPlanTree {
  children?: any[];
  content?: any;
  label?: string;
  parentId?: any;
  proId?: any;
  value?: string;
}
// 添加答辩 添加数据
export interface AddDefence {
  classplan: string[];
  defenceAdress: string;
  defenceAuthorName: string;
  defenceClassId: string;
  defenceCreateTime: string;
  defenceEndTime: string;
  defenceId: string;
  defenceMajorId: string;
  defencePlanId: string;
  defenceScore: string;
  degenceName: string;
  majorList: string;
  time: string[];
}