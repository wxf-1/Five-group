export interface RootObject {
  id: string;
  name: string;
  parentId: string;
  children?: any;
}
export interface ISkillListItem {
  isAsc:string;
  pageNum:number;
  pageSize:number;
  searchTitle?:string;
  majorId?:string;
  status?:number;
  isMyInfo:boolean;
  name:string,
  id:string,
}
export interface ISKILLlist {
  stationId: string;
  stationVersionId: string;
  name: string;
  majorId?: string;
  userId: string;
  userName: string;
  status: string;
  skillNum?: string;
  majorName?: string;
  stationVersion: number;
  stationLevelList?: any;
  labelTreeList?: any;
  skillList?: any;
  createTime: string;
}
export interface ISkillAddItem {
  majorId: string;
  name: string;
  stationVersion: number;
  userName: string;
  stationVersionId: string;
  majorName: string;
  stationLevelList: StationLevelList[];
  describes?: string;
  salaryList?: number[];
  stationTask?: string;
}

interface StationLevelList {
  describes: string;
  salaryList: number[];
  stationLevel: number;
  stationTask: string;
  level_name: string;
  disabled: boolean;
}
export interface ISkillDescriptionListItem {
  key: string;
  id: string;
  label: string;
  parentId: string;
  children?: any;
  content?: any;
}

interface Params {
  [key:string]:any
}

export interface iSkillListSkill {
  searchValue?: any;
  createBy?: any;
  createTime?: any;
  updateBy?: any;
  updateTime?: any;
  remark?: any;
  params: Params;
  id: string;
  skillName: string;
  stationId: string;
  stationVersionId: string;
  parentId: string;
  levelType: number;
  masterRequired: number;
  abilityStandard?: any;
  score?: any;
  scoreId?: any;
}
export interface Igetsxtype {
  isAsc?: string
  pageNum?: number
  pageSize?: number
  sxtype?: number|null
  status?: null|number
  proName?: null
  newProjectList?: number
  specialtyTag:string|null
  industryTag:string|null
}
export interface Idata {
  name:string
  authorid: string
  createBy: null
  createTime: string
  favorcount: null
  id: string
  major: string
  newVersionId: null
  params: {}
  pictureUrl: null
  prodescription: string
  proname: string
  publishtime: null
  remark: null
  richText: null
  score: null
  searchValue: null
  showUrl: string
  status: string
  stucount: null
  subjecttime: string
  sxtype: string
  taskCount: number
  trade: string
  updateBy: null
  updateTime: string
  version: string
  versionId: string
  versionNum: string
}
export interface IArr {
  children?: IArrItem[],
  content?: null,
  label?: string,
  parentId?: string,
  proId?: null,
  value?: string
}
export interface IArrItem {
  children?: null
  content?: null
  label?: string
  parentId?: null
  proId?: null
  value?: string
}