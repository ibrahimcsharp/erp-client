import { IdmMissionModel } from "./idm.mission.model";

export class IdmVissionModel{
        id:number;
        vision :string;
        deadline :string;
        target :string;
        achievement :string;
        comments :string;
        employee_id :string;
        employee_name :string;
        department :string;
        section :string;
        designation :string;
        missionList:IdmMissionModel[];
}