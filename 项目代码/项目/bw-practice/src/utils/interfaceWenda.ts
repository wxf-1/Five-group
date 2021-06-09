interface WendaList {
  answerId: string;
  proId?: string;
  taskId?: string;
  stepId?: string;
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
  className: string;
  authentication: number;
  collection: number;
  supportUp?: any;
  unsupportDown?: any;
  supportUpB: boolean;
  unsupportDownB: boolean;
  flag:boolean
}
interface tan{
  questionTitle: string,
  index?:string,
  isRight:number,
  carIndex3?:string
}
interface answer{
  questionIdList:string[],
  replyContext:string
}