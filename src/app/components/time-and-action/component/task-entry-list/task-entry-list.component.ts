import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskEntryModel } from '../../model/task-enry.model';
import { TimeAndActionService } from '../../service/time-and-action.service';
import { TaskEntryComponent } from '../task-entry/task-entry.component';

@Component({
  selector: 'app-task-entry-list',
  templateUrl: './task-entry-list.component.html',
  styleUrls: ['./task-entry-list.component.scss']
})
export class TaskEntryListComponent implements OnInit {
  @ViewChild('TaskEntry') child: TaskEntryComponent;
  taskList:TaskEntryModel[];
  taskListModel:TaskEntryModel;
  displayBasic:boolean;
  constructor(
    private toastr: ToastrService,
    public taskService: TimeAndActionService,
  ) { }

  ngOnInit(): void {
    this.LoadTaskData();
  }

  LoadTaskData() {
    this.taskService.GetAllTaskList().subscribe((data: any) => {
      if (data) {
        this.taskList = data;
        console.log(this.taskList)
      }

    }, error => {
      this.toastr.warning("Failed To Load Data", "Task List");
      this.taskList = null;
    });
  }

  editTask(task: TaskEntryModel) {
    debugger;
    this.child.TaskEntryModel = task;
    this.child.InitializeFormFromParent();
    this.child.saveButtonTitle = "Update";
    this.displayBasic = true;
  }

  
  OpenNew() {
    this.displayBasic = true;
  }

}
