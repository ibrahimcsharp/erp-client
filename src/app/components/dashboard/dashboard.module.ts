import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FullCalendarModule } from "@fullcalendar/angular";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { CountToModule } from "angular-count-to";
import { ChartistModule } from "ng-chartist";
import { ChartsModule } from "ng2-charts";
import { Ng2GoogleChartsModule } from "ng2-google-charts";
import { PanelModule } from "primeng/panel";
import { SharedModule } from "../../shared/shared.module";
import { ConferrenceModule } from "../conferrence-room/conferrence.module";
import { MerchandisingRoutingModule } from "../merchandising/merchandising-routing.module";
import { MerchandisingModule } from "../merchandising/merchandising.module";
import { NewsfeedComponent } from "./component/newsfeed/newsfeed.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [DashboardComponent, NewsfeedComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CountToModule,
    SharedModule,
    ChartsModule,
    Ng2GoogleChartsModule,
    NgxChartsModule,
    ChartistModule,
    PanelModule,
    MerchandisingModule,
    MerchandisingRoutingModule,
    ConferrenceModule,
    FullCalendarModule
  ],
})
export class DashboardModule {}
