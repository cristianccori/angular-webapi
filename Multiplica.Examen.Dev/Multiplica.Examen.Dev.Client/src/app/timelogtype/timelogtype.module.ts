import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { NotificationMessageModule } from '../shared/ui/notificationmessage/notificationmessage.module';
import { TimeLogTypeComponent } from "./timelogtype.component";
import { TimeLogTypeDetailComponent } from "./timelogtype-detail.component";
import { TimeLogTypeRouting } from "./timelogtype.routing";
import { DataService } from "../shared/services/data.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        TimeLogTypeRouting,
        NotificationMessageModule
    ],
    declarations: [TimeLogTypeComponent, TimeLogTypeDetailComponent],
    providers: [DataService]
})
export class TimeLogTypeModule { }
