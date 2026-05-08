import { Forecast } from './forecast';

export class ForecastMainModel {
    forecastMainId:number;
    seasonId: number;
    seasonName:string;
    yearId: number;
    yearName:string;
    weekId: number;
    weekName:string;
    forecastMainModels:Forecast[];
    file:string;
}
