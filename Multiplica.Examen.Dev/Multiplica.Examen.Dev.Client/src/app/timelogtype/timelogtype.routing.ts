import { Routes, RouterModule } from '@angular/router';
import { TimeLogTypeComponent } from "./timelogtype.component";

const TimeLogTypeRoutes: Routes = [
    {
        path: 'timelogtype',
        component: TimeLogTypeComponent
    }
];

export const TimeLogTypeRouting = RouterModule.forRoot(TimeLogTypeRoutes);
