import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NotificationMessageComponent } from './notificationmessage.component';

const NOTIFICATIONMESSAGE_COMPONENTS = [NotificationMessageComponent];

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: NOTIFICATIONMESSAGE_COMPONENTS,
    exports: NOTIFICATIONMESSAGE_COMPONENTS
})
export class NotificationMessageModule { }