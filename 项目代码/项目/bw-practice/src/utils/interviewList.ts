export interface Iprofessional {
    id: string;
    name: string;
    parentId: string;
    children?: any;
}
export interface ISkillListItem {
    interviewId: any;
    stationName: string;
    isAsc: string;
    pageNum: number;
    pageSize: number;
    searchTitle: string;
    majorId?: string;
    status?: number;
    isMyInfo: boolean;
}
export interface ISkillList {
    askAndanswerList: any,
    commitName: string,
    commitPeople: string,
    companyName: string,
    duration: any,
    intervierManagement: string,
    interviewId: string,
    interviewTime: string,
    issoundrecord: number,
    majorId: string,
    majorName: string,
    record: any,
    shield: number,
    site: any,
    soundrecordList: any,
    stationId: string,
    stationName: string,
    status: number
}
export interface Ifuzzy {
    searchTitle: string;
    status: number;
    pageNum: number;
    pageSize: number
}
export interface IState {
    searchTitle:string;
    status: number;
    pageNum: number;
    pageSize: number;
}