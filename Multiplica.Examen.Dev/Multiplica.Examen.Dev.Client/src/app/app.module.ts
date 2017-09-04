import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from "./shared/services/data.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { NotificationMessageModule } from './shared/ui/notificationmessage/notificationmessage.module';
import { RouterModule, Routes } from '@angular/router';
import { TimeLogTypeComponent } from './timelogtype/timelogtype.component';
import { TimeLogTypeDetailComponent } from "./timelogtype/timelogtype-detail.component";
import { TimeLogTypeRouting } from "./timelogtype/timelogtype.routing";
import { SidePanelModule } from './shared/ui/sidepanel/sidepanel.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        TimeLogTypeRouting,
        GridModule,
        SidePanelModule,
        NotificationMessageModule
    ],
    declarations: [
        AppComponent,
        TimeLogTypeComponent,
        TimeLogTypeDetailComponent
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule { }
