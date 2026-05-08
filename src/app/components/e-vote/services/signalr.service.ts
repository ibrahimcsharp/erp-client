import { Injectable } from "@angular/core";
import * as signalR from "@aspnet/signalr"; // or from "@microsoft/signalr" if you are using a new library
import { ChartModel } from "../model/chart-model";

@Injectable()
export class SignalrService {
  constructor() {}
  public data: ChartModel[];
  private hubConnection: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:5000/chart")
      .build();
    this.hubConnection
      .start()
      .then(() => console.log("Connection started"))
      .catch((err) => console.log("Error while starting connection: " + err));
  };
  public addTransferChartDataListener = () => {
    this.hubConnection.on("transferchartdata", (data) => {
      this.data = data;
      console.log(data);
    });
  };
}
