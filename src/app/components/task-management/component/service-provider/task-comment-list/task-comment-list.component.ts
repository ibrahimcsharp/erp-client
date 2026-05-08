import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TaskCommonService } from '../../../services/task.common.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Subscription, interval } from 'rxjs';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-task-comment-list',
  templateUrl: './task-comment-list.component.html',
  styleUrls: ['./task-comment-list.component.scss']
})
export class TaskCommentListComponent implements OnInit {
  allTaskCommentsList: any[] = [];
  private isDestroyed: boolean = false;
  private subscription: Subscription;

  constructor(public taskCommonService: TaskCommonService,
    private cdr: ChangeDetectorRef,
    public authService: AuthService,) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.taskCommonService.GetTaskCommentByTaskId(this.taskCommonService.selectedTaskId);
    //this.initSignalRConnection();

    // const connection = new signalR.HubConnectionBuilder()
    //   .configureLogging(signalR.LogLevel.Information)
    //   .withUrl("http://localhost:5000/taskList")
    //   .withAutomaticReconnect()
    //   .build();

    // connection.start().then(function () {
    //   console.log('SignalR Connected for task comments!');
    // }).catch(function (err) {
    //   return console.error(err.toString());
    // });

    // connection.on("BroadcastMessage", (data: any, flag: any, errorMsg: any) => {
    //   if (flag === 'task_comments_list') {
    //     this.allTaskCommentsList = data;
    //     this.taskCommonService.taskCommentList = this.allTaskCommentsList.filter(x => x.taskId == this.taskCommonService.selectedTaskId);
    //   }
    //   this.cdr.detectChanges();
    // });

    // this.updateSubscription = interval(3000).subscribe(
    //   (val) => {

    //     this.taskCommonService.GetTaskCommentByTaskId(this.taskCommonService.selectedTaskId);
    //   });
  }

  ngOnDestroy() {
    this.isDestroyed = true;
    this.subscription.unsubscribe();
  }

  initSignalRConnection() {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      //.withUrl("http://localhost:5000/taskList")
      .withUrl("http://192.168.2.246:5000/taskList")
      .withAutomaticReconnect()
      .build();

    connection.start().then(function () {
      console.log('SignalR Connected for task comments!');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("BroadcastMessage", (data: any, flag: any, errorMsg: any) => {
      if (!this.isDestroyed) {
        this.cdr.detectChanges();
        if (flag === 'task_comments_list') {
          this.allTaskCommentsList = data;
          this.taskCommonService.taskCommentList = this.allTaskCommentsList.filter(x => x.taskId == this.taskCommonService.selectedTaskId);
        }
      }
    });
  }
}
