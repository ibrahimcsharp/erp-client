import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferrenceRoutingModule } from './conferrence-routing.module';
import { ConferenceRequitionComponent } from './component/conference-requition/conference-requition.component';
import { ConferenceRequitionListComponent } from './component/conference-requition-list/conference-requition-list.component';
import { ConferrenceService } from './services/conferrence.service';
import { MerchandisingModule } from '../merchandising/merchandising.module';
import {PickListModule} from 'primeng/picklist';
import { MeetingCalendarComponent } from './component/meeting-calendar/meeting-calendar.component'
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { ConferenceMeetingListComponent } from './component/conference-meeting-list/conference-meeting-list.component';
import { ConferenceReportComponent } from './component/conference-report/conference-report.component'; // a plugin!

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);



@NgModule({
  declarations: [ConferenceRequitionComponent, 
    ConferenceRequitionListComponent,
     MeetingCalendarComponent,
     ConferenceMeetingListComponent,
     ConferenceReportComponent, 
    ],
  imports: [
    CommonModule,
    MerchandisingModule,
    ConferrenceRoutingModule,
    PickListModule,
    FullCalendarModule,
  ],
  exports: [
    MeetingCalendarComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ConferrenceService],
})
export class ConferrenceModule { }
