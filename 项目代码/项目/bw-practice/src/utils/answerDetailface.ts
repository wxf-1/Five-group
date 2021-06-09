export interface AnswerDetailList {
  answerId: string;
  userId: string;
  userName: string;
  qUserLevel?: any;
  userPictureUrl: string;
  createTime: string;
  questionTitle: string;
  questionContent: string;
  answerCount: number;
  favorCount: number;
  unSupportCount: number;
  supportCount: number;
  labels: any[];
  andAnswerReplyInfos?: any;
  typeNum: string;
  pushTime: string;
  quality: number;
  shield: number;
  authentication: number;
  collection: number;
  andAnswerReplyInfoByTeachers?: any;
}

export interface ISAnswerDetailIte{
  
 answerId: string
  status: number
  isScort: number
  pageNum: number
  pageSize: number
  answerReplyId:string
}

export interface ISsetAntuor{
  answerId: string
}

export interface ISAnswerCommentList {
  replyId: string;
  parentId?: any;
  userId: string;
  userName: string;
  userLevel?: any;
  userPictureUrl: string;
  questionValue?: any;
  questionTitle?: any;
  questionId?: any;
  replyContext: string;
  isRight: number;
  rightId?: any;
  answerCount: number;
  unSupportCount: number;
  supportCount: number;
  replyTime: string;
  replyDate: string;
  shield: number;
  authentication: number;
  quality: number;
  selectRightReplyList?: any;
  questionIdList?: any;
}


export interface Responsevisble{
  questionTitle: string
  type: string
  isRight: number
  pageNum: number
  pageSize: number
}

export interface ResponsevisbleItem {
  taskAnswerId?: any;
  taskId: string;
  answerId: string;
  questionContent?: any;
  questionTitle: string;
  labels?: any;
  replyContent?: any;
  askandanswerReplyList?: any;
  importShow?: any;
  type?: any;
  typeName: string;
  text1?: any;
  text2?: any;
  proId?: any;
  stepId?: any;
  answerIdList?: any;
  source: string;
  author: string;
  qUserId: string;
  createTime: string;
}