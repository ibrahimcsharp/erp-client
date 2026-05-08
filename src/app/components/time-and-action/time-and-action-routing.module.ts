import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTnaJobComponent } from './component/create-tna-job/create-tna-job.component';
import { TaskEntryListComponent } from './component/task-entry-list/task-entry-list.component';
import { TaskTemplateListComponent } from './component/task-template-list/task-template-list.component';
import { TaskTemplateComponent } from './component/task-template/task-template.component';
import { TnaManualProcessComponent } from './component/tna-manual-process/tna-manual-process.component';
import { TnaProcessListComponent } from './component/tna-process-list/tna-process-list.component';
import { MaterialTnaComponent } from './component/material-tna/material-tna.component';
import { TnaDashboardComponent } from './component/tna-dashboard/tna-dashboard.component';


const routes: Routes = [

  {
    path: "task-list",
    component: TaskEntryListComponent,
    data: {
      title: "",
      breadcrumb: "task-list",
    },
  },
  {
    path: "task-template-create", 
    children:[
      {path: "", component: TaskTemplateComponent},
      {path: "edit/:id", component: TaskTemplateComponent},
    ],
    data: {
      title: "",
      breadcrumb: "task-template-create",
    },
  },

  {
    path: "task-template-list",
    component: TaskTemplateListComponent,
    data: {
      title: "",
      breadcrumb: "task-template-list",
    },
  },

  {
    path: "create-job",
    component: CreateTnaJobComponent,
    data: {
      title: "",
      breadcrumb: "create-job",
    },
  },

  {
    path: "tna-manual-process",
    children: [
          { path: "", component: TnaManualProcessComponent },
          { path: "edit/:id", component: TnaManualProcessComponent },
        ],
    // component: TnaManualProcessComponent,
    data: {
      title: "",
      breadcrumb: "tna-manual-process",
    },
  },

  {
    path: "tna-process-list",
    component: TnaProcessListComponent,
    data: {
      title: "",
      breadcrumb: "tna-process-list",
    },
  },

  {
    path: "material-tna",
    children: [
      { path: "", component: MaterialTnaComponent },
      { path: "show/:id", component: MaterialTnaComponent },
    ],
    //component: MaterialTnaComponent,
    data: {
      title: "",
      breadcrumb: "material-tna",
    },

  },

  {
    path: "tna-dashboard",
    component: TnaDashboardComponent,
    data: {
      title: "",
      breadcrumb: "tna-dashboard",
    },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeAndActionRoutingModule { }
