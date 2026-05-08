import { EmployeeSkillPlanModel } from "./employee-skill-plan.model";

export class SkillPlanMaster{
        totalTargetCoach :number;
        totalRealizedCoach :number;
        totalTargetAutonomy :number;
        totalRealizedAutonomy :number;
        totalParticipationInTraining :number;
        trainingDonePercentage :number;
        totalCoachPercentage :number;
        totalAutonomyPercentage :number;
        skillPlanList:EmployeeSkillPlanModel[];
}