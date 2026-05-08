export class TemplateEntryItemModel {
    id: number;
    name: string;
    tasks: string;
    deadline: Date;
    deadlineDays: number;
    executionDays: number;
    noticeBefore: number;
    source: string;
    dependentTask: string;
    dependentTaskId: number;
    responsibleDept: string;
    accountablePerson:string
    consultedPerson:string
    informedPerson:string
    activeStatus: number;
    tnaTaskSetupId: number;
    tnaTempMstId: number;

}