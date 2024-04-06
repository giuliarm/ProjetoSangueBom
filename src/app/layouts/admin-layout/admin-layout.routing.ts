import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'home',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'maps',           component: MapsComponent }
];
