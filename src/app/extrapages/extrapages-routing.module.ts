import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceComponent } from './maintenance/maintenance.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
// import { LockscreenComponent } from './lockscreen/lockscreen.component';
// import { Lockscreen2Component } from './lockscreen2/lockscreen2.component';
// import { ConfirmmailComponent } from './confirmmail/confirmmail.component';
// import { Confirmmail2Component } from './confirmmail2/confirmmail2.component';
// import { VerificationComponent } from './verification/verification.component';
// import { Verification2Component } from './verification2/verification2.component';
// import { SteptwoverificationComponent } from './steptwoverification/steptwoverification.component';
// import { Steptwoverification2Component } from './steptwoverification2/steptwoverification2.component';
// import { ComingsoonComponent } from './comingsoon/comingsoon.component';

const routes: Routes = [
    {
        path: 'maintenance',
        component: MaintenanceComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ExtrapagesRoutingModule { }
