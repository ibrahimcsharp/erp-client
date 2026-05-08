export class MapModel {
    status: number;
    message: string;
    data: Data[];
}

export class Data {
    name: string;
    time: string;
    latitude: number;
    longitude: number;
    speed: number;
    engine_status: boolean;
    sensors: Sensor[];
    stop_duration: string;
}

export class Sensor {
    type: string;
    name: string;
    value: string;
}